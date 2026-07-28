import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resend } from 'resend'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'demo-requests.json')
const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())

// --- Configuration Resend ---
// RESEND_API_KEY doit être définie en variable d'environnement sur Render.
// NOTIF_EMAIL = l'adresse qui doit recevoir les notifications (ex: pjjpascalien@gmail.com)
const resend = new Resend(process.env.RESEND_API_KEY)

function readRequests() {
  if (!fs.existsSync(DATA_FILE)) return []
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  } catch {
    return []
  }
}

function saveRequest(entry) {
  const all = readRequests()
  all.push(entry)
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2))
}

async function sendNotificationEmail(entry) {
  const destinataire = process.env.NOTIF_EMAIL
  if (!destinataire) {
    console.warn('NOTIF_EMAIL non configuré : email non envoyé.')
    return
  }

  const { data, error } = await resend.emails.send({
    // Tant que tu n'as pas connecté ton propre nom de domaine sur Resend,
    // l'adresse d'envoi doit rester "onboarding@resend.dev" (adresse de test fournie par Resend).
    from: 'POS PRO MADA <onboarding@resend.dev>',
    to: destinataire,
    subject: `Nouvelle demande de démo — ${entry.nom} (${entry.commerce})`,
    text: `Nouvelle demande de démo gratuite reçue depuis le site :

Nom : ${entry.nom}
Type de commerce : ${entry.commerce}
Ville : ${entry.ville || 'Non renseignée'}
Téléphone : ${entry.telephone}
Message : ${entry.message || 'Aucun message'}

Reçu le : ${entry.reçu_le}
`,
  })

  if (error) {
    throw new Error(JSON.stringify(error))
  }
  return data
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'pos-pro-mada-server' })
})

// Reçoit une demande de démo depuis le formulaire de contact du site
app.post('/api/contact', async (req, res) => {
  const { nom, commerce, ville, telephone, message } = req.body || {}

  if (!nom || !commerce || !telephone) {
    return res.status(400).json({ error: 'Champs obligatoires manquants : nom, commerce, téléphone.' })
  }

  const entry = {
    id: Date.now().toString(36),
    nom,
    commerce,
    ville: ville || '',
    telephone,
    message: message || '',
    reçu_le: new Date().toISOString(),
  }

  try {
    saveRequest(entry)
    console.log('Nouvelle demande de démo reçue :', entry)

    // Envoi de l'email de notification (ne bloque pas la réponse si ça échoue)
    try {
      await sendNotificationEmail(entry)
      console.log('Email de notification envoyé avec succès.')
    } catch (mailErr) {
      console.error("Erreur lors de l'envoi de l'email :", mailErr)
    }

    res.status(201).json({ status: 'ok', message: 'Demande enregistrée.' })
  } catch (err) {
    console.error("Erreur en enregistrant la demande :", err)
    res.status(500).json({ error: "Erreur serveur, réessayez plus tard." })
  }
})

// Liste des demandes reçues (protégée par une clé simple à passer en paramètre)
app.get('/api/contact', (req, res) => {
  if (req.query.key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Non autorisé.' })
  }
  res.json(readRequests())
})

app.listen(PORT, () => {
  console.log(`Serveur POS PRO MADA à l'écoute sur http://localhost:${PORT}`)
})
