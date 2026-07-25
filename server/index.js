import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'demo-requests.json')
const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())

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

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'pos-pro-mada-server' })
})

// Reçoit une demande de démo depuis le formulaire de contact du site
app.post('/api/contact', (req, res) => {
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
    // Ici, on pourrait brancher un envoi d'email ou une notification WhatsApp/SMS
    // vers +261 32 13 590 22 / pjjpascalien@gmail.com.
    console.log('Nouvelle demande de démo reçue :', entry)
    res.status(201).json({ status: 'ok', message: 'Demande enregistrée.' })
  } catch (err) {
    console.error('Erreur en enregistrant la demande :', err)
    res.status(500).json({ error: "Erreur serveur, réessayez plus tard." })
  }
})

// Liste des demandes reçues, pour un usage interne (à protéger avant mise en prod)
app.get('/api/contact', (_req, res) => {
  res.json(readRequests())
})

app.listen(PORT, () => {
  console.log(`Serveur POS PRO MADA à l'écoute sur http://localhost:${PORT}`)
})
