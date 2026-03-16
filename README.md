# ⚡ FORTPEDIA — Le Guide Fortnite Ultime

> Guide Fortnite complet en **FR / EN / ES** — 100% HTML, CSS, JavaScript vanilla. Aucune dépendance, aucun framework.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-FFD700?style=flat-square)
![Langues](https://img.shields.io/badge/Langues-FR%20%7C%20EN%20%7C%20ES-00C3FF?style=flat-square)

---

## 📖 Description

**FORTPEDIA** est un site guide complet sur Fortnite, conçu et développé par **Rachid**. Il couvre l'intégralité du jeu : son histoire, ses mécaniques, ses modes, ses statistiques, la scène esport, les tournois FNCS 2026, les classements pro, les patch notes et bien plus. Le tout dans un design gaming épique avec support multilingue natif.

---

## ✨ Fonctionnalités

- 🌍 **Multilingue** — Basculement instantané FR / EN / ES sans rechargement
- 📊 **Stats & Records** — Chiffres clés, graphiques animés, records officiels, camembert des modes, plateformes
- 🏆 **Classements Pro** — Top 10 joueurs mondiaux + Top 8 teams esport (FNCS 2026)
- 🗓️ **Patch Notes & Roadmap** — Historique des MAJ + calendrier officiel jusqu'à décembre 2026
- ⚔️ **Tournois FNCS 2026** — Calendrier complet avec prize pools ($10M+)
- 💰 **V-Bucks & Prix** — Tarifs à jour depuis le 19 mars 2026 (Saison 2)
- 📱 **Réseaux Officiels** — X, Instagram, YouTube, TikTok, Discord, Twitch, Reddit
- 📚 **Glossaire** — 16 termes essentiels pour parler comme un pro
- 🎨 **Design gaming épique** — Glitch effect, particules animées, curseur custom, scanlines
- ⚡ **Zéro dépendance** — Un seul fichier `.html`, aucun npm, aucun build

---

## 🗂️ Sections du site

| # | Section | Description |
|---|---------|-------------|
| 01 | Histoire | Chronologie de 2011 à 2026 |
| 02 | Bases | Mécaniques fondamentales |
| 03 | Modes de jeu | BR, Zéro Build, STW, Créatif |
| 04 | Raretés | Commun → Mythique |
| 05 | Conseils Pro | 8 tips de joueurs compétitifs |
| 06 | Stats & Records | Chiffres, graphiques, records |
| 07 | V-Bucks & Prix | Tarifs 2026 mis à jour |
| 08 | Teams Esport | 8 organisations majeures |
| 09 | Tournois 2026 | FNCS, LAN, EWC, Global Champ. |
| 10 | Classements Pro | Top 10 joueurs + Top 8 teams |
| 11 | Patch Notes | Historique MAJ + Roadmap 2026 |
| 12 | Vidéos | 6 chaînes incontournables |
| 13 | Réseaux Officiels | Tous les comptes Fortnite |
| 14 | Glossaire | 16 termes essentiels |

---

## 🚀 Installation & Utilisation

### Option 1 — Ouvrir directement

```bash
# Cloner le repo
git clone https://github.com/ton-username/fortpedia.git

# Ouvrir dans le navigateur
open fortnite-guide.html
```

> ⚠️ Certains navigateurs bloquent les requêtes réseau depuis `file://`. Pour une expérience complète, utilise un serveur local.

### Option 2 — Serveur local (recommandé)

```bash
# Avec Python
python3 -m http.server 8080

# Avec Node.js
npx serve .

# Puis ouvrir
http://localhost:8080/fortnite-guide.html
```

### Option 3 — Déploiement instantané sur Netlify

1. Va sur [netlify.com](https://netlify.com)
2. Glisse-dépose le fichier `fortnite-guide.html`
3. Ton site est en ligne avec une URL publique en 10 secondes

---

## 🛠️ Stack technique

| Technologie | Utilisation |
|-------------|-------------|
| HTML5 | Structure sémantique |
| CSS3 | Design, animations, responsive |
| JavaScript ES6+ | Logique, i18n, graphiques SVG |
| Google Fonts | Bebas Neue, Rajdhani, Share Tech Mono |
| Fortnite API | Images cosmétiques (fortnite-api.com) |

**Aucun framework. Aucune dépendance. Un seul fichier.**

---

## 🌍 Système multilingue

Le système i18n est entièrement custom, intégré en JS vanilla. Toutes les clés textuelles sont définies dans un objet de traduction pour chaque langue.

```javascript
// Exemple de structure
const translations = {
  fr: { "hero.title": "FORTPEDIA", ... },
  en: { "hero.title": "FORTPEDIA", ... },
  es: { "hero.title": "FORTPEDIA", ... }
};
```

Les éléments HTML utilisent `data-i18n="clé"` pour être mis à jour instantanément au clic sur FR / EN / ES.

---

## 📁 Structure du projet

```
fortpedia/
├── fortnite-guide.html   # Fichier principal (tout-en-un)
└── README.md             # Ce fichier
```

---

## 📊 Données & Sources

- **Statistiques** : Chiffres officiels Epic Games, rapports annuels et déclarations publiques
- **Patch Notes** : Basés sur les notes officielles Fortnite.com
- **Classements** : Basés sur les résultats FNCS officiels (fncompetitive.com)
- **Tournois** : Calendrier officiel Epic Games / FNCS 2026
- **Prix V-Bucks** : Mis à jour au 19 mars 2026 (lancement C7S2)

---

## ⚖️ Droits & Mentions légales

**© 2026 Rachid — Tous droits réservés.**

Toute reproduction, même partielle, est interdite sans autorisation écrite du créateur.

> FORTPEDIA est un site non officiel, créé à titre informatif et éducatif. Il n'est pas affilié à Epic Games.  
> **Fortnite®** est une marque déposée d'**Epic Games, Inc.**  
> Les images de cosmétiques sont fournies via l'API publique [fortnite-api.com](https://fortnite-api.com).

---

## 👤 Auteur

**Rachid** — Développeur & designer du site  
Projet personnel créé pour le fun avec ❤️ et ⚡

---

*Dernière mise à jour : 16 mars 2026*
