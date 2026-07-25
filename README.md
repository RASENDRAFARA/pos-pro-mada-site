# Site web POS PRO MADA

Site vitrine (React + Node/Express) pour présenter le logiciel **POS PRO MADA**, destiné aux
épiceries, quincailleries, pharmacies, supermarchés, grossistes et restaurants de Madagascar.

## Structure du projet

```
pos-pro-mada-site/
├── src/                  # Frontend React (Vite)
│   ├── components/       # Header, Hero, Features, Comparison, Audience, Platforms, Contact, Footer
│   ├── App.jsx / App.css
│   └── index.css         # Palette, typographies, styles de base
├── server/                # Backend Node.js / Express
│   └── index.js          # API qui reçoit les demandes de démo du formulaire
├── index.html
└── package.json
```

## Contenu du site

- **Accueil (Hero)** : accroche + ticket de caisse animé (élément visuel signature).
- **Fonctionnalités** : caisse rapide, gestion de stock, rapports, utilisateurs, sécurité, mode hors ligne.
- **Avant / après** : comparaison gestion manuelle vs POS PRO MADA.
- **Pour qui** : épiceries, quincailleries, pharmacies, supermarchés, grossistes, restaurants.
- **Plateformes** : Windows (disponible), tablette Android (bientôt).
- **Contact / Démo gratuite** : formulaire relié à l'API, coordonnées de contact.

## Lancer le site en local

Il faut deux terminaux : un pour le frontend, un pour le backend.

### 1. Backend (API)

```bash
cd server
npm install
npm start
```

Le serveur démarre sur `http://localhost:4000`. Les demandes de démo reçues sont enregistrées
dans `server/demo-requests.json` (et affichées dans la console).

### 2. Frontend (site)

Dans un autre terminal, à la racine du projet :

```bash
npm install
cp .env.example .env      # ajustez VITE_API_URL si besoin
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

## Construire le site pour la mise en ligne

```bash
npm run build
```

Le résultat est généré dans `dist/` — un dossier de fichiers statiques prêt à héberger sur
n'importe quel hébergeur web (ex. hébergement mutualisé, Netlify, Vercel, ou un simple VPS avec Nginx).

Le backend (`server/`) doit tourner en continu sur un serveur (ex. VPS, service Node comme
Render/Railway) pour que le formulaire de contact fonctionne une fois le site en ligne. Pensez
à mettre à jour `VITE_API_URL` avec l'adresse réelle du serveur avant de reconstruire le site.

## Pour aller plus loin

- **Notifications** : brancher l'envoi d'un email ou d'un message WhatsApp à chaque nouvelle
  demande de démo (le point d'entrée est déjà prévu dans `server/index.js`).
- **Logo** : le site utilise un pictogramme recréé simplement en SVG (`public/favicon.svg` et
  dans `Header.jsx`) en attendant le fichier logo officiel en haute résolution.
- **Version tablette Android** : la section "Plateformes" est prête à passer sur "Disponible"
  dès que la version Android sera prête.

## Coordonnées affichées sur le site

- Téléphone : +261 32 13 590 22
- Email : pjjpascalien@gmail.com
- Facebook : POS PRO MADA
- Localisation : Majunga, Madagascar
