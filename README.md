<<<<<<< HEAD
# ORHATA - Site Web Institutionnel

Site web institutionnel premium pour ORHATA, structure de reprise et de transmission de PME en France.

## 🎯 Objectif

Site web institutionnel haut de gamme destiné à :
- Dirigeants de PME en situation de transmission
- Investisseurs spécialisés (private equity, family offices, fonds de transmission)
- Partenaires institutionnels

## 🎨 Design

- **Style** : Institutionnel premium, sobre et élégant
- **Couleurs** : Bleu profond (#0A2540), gris anthracite (#2C3E50), blanc, touches dorées (#D4AF37)
- **Typographie** : 
  - Titres : Playfair Display (serif moderne)
  - Textes : Inter (sans-serif lisible)
- **Animations** : Légères et sobres
- **Espacement** : Beaucoup d'espace blanc pour un rendu premium

## 📁 Structure du site

### Pages principales

1. **index.html** - Page d'accueil
   - Hero section avec message fort
   - Le contexte de la transmission en France
   - Notre approche (aperçu)
   - Pourquoi ORHATA
   - Appel à contact

2. **notre-projet.html** - Notre projet
   - Présentation de la stratégie de reprise
   - Enjeux de la transmission d'entreprise
   - Vision long terme
   - Création de valeur responsable
   - Respect de l'ADN des entreprises reprises

3. **equipe.html** - L'équipe
   - Présentation des deux co-fondateurs
   - Complémentarité des profils (finance / ingénierie)
   - Parcours international
   - Citation inspirante

4. **approche.html** - Notre approche
   - Entrepreneurs opérateurs (pas financiers passifs)
   - Accompagnement opérationnel
   - Gouvernance saine
   - Croissance maîtrisée
   - Ancrage territorial

5. **transmission-investisseurs.html** - Transmission & Investisseurs
   - Message dédié aux cédants
   - Message dédié aux investisseurs
   - Approche gagnant-gagnant
   - Vision long terme

6. **contact.html** - Contact
   - Formulaire simple et rassurant
   - Ton institutionnel
   - Call-to-action : "Entrer en discussion confidentielle"

## 🛠️ Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec variables CSS, flexbox, grid
- **JavaScript** : Interactions et animations au scroll
- **Responsive Design** : Mobile-first, adapté à tous les écrans

## 📂 Structure des fichiers

```
orhata-main/
├── index.html
├── notre-projet.html
├── equipe.html
├── approche.html
├── transmission-investisseurs.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── README.md
```

## 🚀 Utilisation

### Développement local

1. Ouvrir le fichier `index.html` dans un navigateur web
2. Ou utiliser un serveur local :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js (http-server)
   npx http-server
   ```

### Personnalisation

#### Couleurs
Les couleurs sont définies dans `assets/css/style.css` via les variables CSS :
```css
:root {
    --color-primary: #0A2540;
    --color-accent: #D4AF37;
    /* ... */
}
```

#### Contenu
Modifier directement les fichiers HTML pour adapter le contenu.

#### Formulaire de contact
Le formulaire de contact nécessite une intégration backend pour l'envoi des emails. Actuellement, il affiche une alerte de confirmation. Pour une mise en production, intégrer avec :
- Un service d'email (SendGrid, Mailgun, etc.)
- Un backend (Node.js, PHP, Python, etc.)
- Ou un service de formulaire (Formspree, Netlify Forms, etc.)

## ✨ Fonctionnalités

- ✅ Navigation responsive avec menu mobile
- ✅ Animations au scroll (fade in)
- ✅ Formulaire de contact avec validation
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ SEO optimisé (meta tags, structure sémantique)
- ✅ Performance optimisée
- ✅ Accessibilité (ARIA labels, navigation clavier)

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints pour :
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🎯 SEO

- Meta descriptions sur chaque page
- Structure HTML sémantique
- Titres hiérarchiques (H1, H2, H3)
- Attributs alt pour les images (à ajouter si images)

## 🔒 Sécurité

- Validation côté client du formulaire
- Protection CSRF à implémenter côté serveur
- HTTPS recommandé en production

## 📝 Notes

- Le site est prêt pour la présentation à des investisseurs ou cédants
- Le design inspire immédiatement la confiance
- Ton professionnel, sobre et rassurant
- Zéro marketing agressif

## 📄 Licence

© 2024 ORHATA. Tous droits réservés.
=======
# orhata
>>>>>>> bf3a553921d24bbb1bb5e7dc0e17352ea7627cba
