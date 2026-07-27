import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nodemailer from 'nodemailer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'demo-requests.json')
const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())

// --- Configuration de l'envoi d'email (Gmail) ---
// EMAIL_USER et EMAIL_PASS doivent être définis en variables d'environnement sur Render.
// EMAIL_PASS = un "mot de passe d'application" Gmail (pas ton mot de passe normal).
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // ex: pjjpascalien@gmail.com
    pass: process.env.EMAIL_PASS, // mot de passe d'application (16 caractères)
  },
})

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
  const destinataire = process.env.EMAIL_USER
  if (!destinataire) {
    console.warn('EMAIL_USER non configuré : email non envoyé.')
    return
  }

  await transporter.sendMail({
    from: `"POS PRO MADA — Site web" <${process.env.EMAIL_USER}>`,
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
