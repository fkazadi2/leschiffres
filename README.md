# LesChiffres.cd

LesChiffres.cd est un média d'analyse de données spécialisé dans la visualisation et l'interprétation des données économiques, politiques et sociales.

## Technologies utilisées

- **Frontend**: Next.js avec TypeScript et Tailwind CSS
- **Backend/Base de données**: Supabase (PostgreSQL, Auth, Storage)
- **Visualisation de données**: Chart.js, React-Chartjs-2
- **Déploiement**: Netlify

## Fonctionnalités principales

- Articles d'analyse de données
- Tableaux de bord interactifs
- Visualisations de données dynamiques
- Filtrage par catégorie et période
- Interface responsive et moderne

## Démarrage rapide

### Prérequis

- Node.js 16.x ou supérieur
- npm ou yarn
- Compte Supabase

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-username/leschiffres.cd.git
   cd leschiffres
   ```

2. Installez les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configurez les variables d'environnement :
   - Créez un fichier `.env.local` à la racine du projet
   - Ajoutez les variables Supabase :
     ```
     NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
     NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
     NEXT_PUBLIC_SITE_URL=https://leschiffres.cd
     ```

4. Démarrez le serveur de développement :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Structure du projet

```
leschiffres/
├── public/              # Fichiers statiques (images, favicon, etc.)
├── src/
│   ├── app/             # Pages de l'application (Next.js App Router)
│   ├── components/      # Composants réutilisables
│   │   ├── dashboard/   # Composants pour les tableaux de bord
│   │   ├── home/        # Composants spécifiques à la page d'accueil
│   │   └── layout/      # Composants de mise en page (Header, Footer)
│   ├── lib/             # Utilitaires et fonctions de service
│   └── types/           # Types TypeScript partagés
├── .env.local           # Variables d'environnement locales
├── next.config.ts       # Configuration Next.js
├── tailwind.config.js   # Configuration Tailwind CSS
└── tsconfig.json        # Configuration TypeScript
```

## Déploiement

Le projet est configuré pour être déployé sur Netlify. Un fichier `netlify.toml` est inclus avec les configurations nécessaires.

### Étapes de déploiement

1. Connectez votre dépôt Git à Netlify
2. Configurez les variables d'environnement dans les paramètres de Netlify
3. Déclenchez le déploiement

## Schéma de base de données

Le projet utilise Supabase comme backend avec les tables suivantes :

1. **articles** - Stocke les articles publiés
   - id (uuid, primary key)
   - title (text)
   - slug (text, unique)
   - content (text)
   - excerpt (text)
   - category (text)
   - image_url (text)
   - published_at (timestamp)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **statistics** - Stocke les données statistiques pour les visualisations
   - id (uuid, primary key)
   - title (text)
   - category (text)
   - data (jsonb) - Format pour stocker des séries de données
   - source (text)
   - created_at (timestamp)
   - updated_at (timestamp)

## Contributeurs

- [Votre Nom](https://github.com/votre-username)

## Licence

Ce projet est sous licence [MIT](LICENSE).
