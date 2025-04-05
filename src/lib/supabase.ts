import { createClient } from '@supabase/supabase-js';
import { getLocalImageUrl } from './imageUtils';

// Vérification des variables d'environnement
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Création du client Supabase
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Types pour les articles
export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  author: Author;
  tags?: string[];
  views?: number;
}

// Fonction pour récupérer tous les articles
export async function getArticles(limit = 10, offset = 0) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('publishedAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return null;
  }
}

// Fonction pour récupérer un article par son slug
export async function getArticleBySlug(slug: string) {
  try {
    // En développement, utiliser les données simulées
    // Dans un environnement de production, cette vérification pourrait utiliser process.env.NODE_ENV
    const isDevelopment = true;

    if (isDevelopment) {
      // Récupérer les données simulées
      const mockArticle = getMockArticleData(slug);
      return mockArticle;
    }

    // Dans un environnement de production, utiliser Supabase
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }
}

// Fonction pour récupérer les articles récents
export async function getRecentArticles(limit = 3) {
  try {
    // En développement, utiliser les données simulées
    const isDevelopment = true;

    if (isDevelopment) {
      // Créer quelques slugs aléatoires pour les articles récents
      const slugs = [
        'croissance-economique-rdc-2023',
        'reforme-electorale-enjeux',
        'revolution-numerique-secteur-bancaire',
        'defis-developpement-durable-rdc',
        'secteur-minier-environnement',
        'education-numerique-post-covid'
      ];
      
      // Générer des articles simulés pour ces slugs
      const mockArticles = slugs.slice(0, limit).map(slug => getMockArticleData(slug));
      return mockArticles;
    }

    // Dans un environnement de production, utiliser Supabase
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('publishedAt', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    return [];
  }
}

// Fonction pour récupérer les articles par catégorie
export async function getArticlesByCategory(category: string, limit = 10, offset = 0) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .order('publishedAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
    return null;
  }
}

// Fonction pour mettre à jour les vues d'un article
export async function incrementArticleViews(articleId: string) {
  try {
    // En développement, simuler l'incrémentation
    const isDevelopment = true;

    if (isDevelopment) {
      console.log(`[DEV] Incrémentation des vues pour l'article ${articleId}`);
      return 1; // Simuler l'incrémentation
    }
    
    // Récupérer d'abord le nombre actuel de vues
    const { data: article, error: fetchError } = await supabase
      .from('articles')
      .select('views')
      .eq('id', articleId)
      .single();

    if (fetchError) throw fetchError;

    const currentViews = article?.views || 0;
    const newViews = currentViews + 1;

    // Mettre à jour les vues
    const { error: updateError } = await supabase
      .from('articles')
      .update({ views: newViews })
      .eq('id', articleId);

    if (updateError) throw updateError;

    return newViews;
  } catch (error) {
    console.error(`Error incrementing views for article ${articleId}:`, error);
    return null;
  }
}

// Fonction pour récupérer les statistiques du site
export async function getStats() {
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching site stats:', error);
    return {
      totalArticles: 0,
      totalViews: 0,
      totalCategories: 0,
      totalAuthors: 0
    };
  }
}

// Fonction pour récupérer des données d'article simulées (pour le développement uniquement)
export function getMockArticleData(slug: string): Article {
  // Simuler quelques auteurs
  const authors: Author[] = [
    {
      id: '1',
      name: 'Marie Dupont',
      avatar: getLocalImageUrl(100, 100, 'portrait,woman'),
      role: 'Rédactrice en chef',
      bio: 'Journaliste avec plus de 15 ans d\'expérience dans la presse économique et politique. Ancienne correspondante à l\'étranger.',
      twitterUrl: 'https://twitter.com',
      linkedinUrl: 'https://linkedin.com'
    },
    {
      id: '2',
      name: 'Jean Mbala',
      avatar: getLocalImageUrl(100, 100, 'portrait,man'),
      role: 'Directeur de la publication',
      bio: 'Fondateur du journal, Jean a créé LesCh1ffres.cd avec pour mission d\'offrir une information de qualité et accessible à tous.',
      twitterUrl: 'https://twitter.com',
      linkedinUrl: 'https://linkedin.com'
    },
    {
      id: '3',
      name: 'Sophie Kanza',
      avatar: getLocalImageUrl(100, 100, 'portrait,woman,2'),
      role: 'Responsable économie',
      bio: 'Économiste de formation, elle analyse les tendances et transforme des données complexes en informations accessibles.',
      twitterUrl: 'https://twitter.com',
      linkedinUrl: 'https://linkedin.com'
    },
  ];

  // Simuler le contenu markdown en fonction du slug
  let content = '';
  let title = '';
  let excerpt = '';
  let category = '';
  let imageUrl = '';
  let tags: string[] = [];
  let publishedDate = new Date();
  let authorIndex = 0;

  // Déterminer le contenu en fonction du slug
  if (slug.includes('economie') || slug.includes('croissance') || slug.includes('inflation')) {
    title = 'La croissance économique en RDC atteint 5.7% au premier trimestre 2023';
    excerpt = 'Analyse des facteurs de croissance et perspectives pour le reste de l\'année selon les dernières données de la Banque Centrale du Congo.';
    category = 'Économie';
    imageUrl = getLocalImageUrl(1200, 800, 'economy,business');
    tags = ['Économie', 'Croissance', 'Finances', 'Investissement'];
    authorIndex = 2; // Sophie Kanza
    publishedDate = new Date('2023-04-12T08:00:00Z');
    
    content = `# La croissance économique en RDC atteint 5.7% au premier trimestre 2023

L'économie de la République Démocratique du Congo a enregistré une croissance de 5,7% au premier trimestre 2023, dépassant les prévisions des experts qui tablaient sur 4,9%. Cette performance est d'autant plus remarquable qu'elle s'inscrit dans un contexte mondial incertain.

## Les moteurs de cette croissance

Plusieurs facteurs expliquent cette dynamique positive :

- **Le secteur minier** continue de performer avec une hausse de 8,2% de la production, porté notamment par la demande croissante de cobalt et de cuivre sur les marchés internationaux.
- **L'agriculture** a progressé de 4,1%, bénéficiant de conditions climatiques favorables et d'investissements dans la modernisation des techniques agricoles.
- **Le secteur des télécommunications** poursuit son expansion avec une croissance de 9,3%, confirmant la transformation numérique du pays.

## Impact sur les indicateurs macroéconomiques

Cette croissance robuste s'accompagne d'une relative stabilité des principaux indicateurs :

- L'inflation est maintenue à 6,3%, en baisse par rapport aux 7,2% de la même période en 2022.
- Le franc congolais s'est légèrement apprécié face au dollar (+0,8%).
- Les réserves de change couvrent désormais 3,2 mois d'importations, contre 2,9 mois fin 2022.

## Perspectives pour les prochains trimestres

Selon les projections de la Banque Centrale du Congo, cette tendance positive devrait se maintenir, avec une prévision de croissance annuelle révisée à 6,2% (contre 5,8% initialement).

Le gouvernement a annoncé vouloir capitaliser sur cette dynamique en accélérant les réformes structurelles, notamment :

- La simplification des procédures administratives pour les entreprises
- L'amélioration du climat des affaires
- Le renforcement des infrastructures énergétiques et de transport

## Défis à surmonter

Malgré ces indicateurs positifs, plusieurs défis demeurent :

- La dépendance encore forte aux industries extractives
- Les inégalités persistantes dans la répartition des fruits de la croissance
- Les tensions sécuritaires dans certaines régions qui freinent les investissements

### Réactions des experts

**"Ces chiffres confirment la résilience de l'économie congolaise face aux chocs externes"**, estime Professeur Kabongo de l'Université de Kinshasa. **"Toutefois, l'enjeu reste de transformer cette croissance en développement inclusif et durable."**

Pour Jean-Marc Kilolo, analyste à la Standard Bank, **"la diversification de l'économie congolaise commence à porter ses fruits, mais le chemin vers une économie moins dépendante des matières premières reste long."**

## Conclusion

Cette performance économique place la RDC parmi les économies les plus dynamiques d'Afrique subsaharienne pour ce début d'année 2023. Les autorités monétaires et le gouvernement sont appelés à maintenir le cap des réformes pour assurer la durabilité de cette croissance et son impact positif sur le niveau de vie des Congolais.`;
  } else if (slug.includes('politique') || slug.includes('reforme') || slug.includes('electoral')) {
    title = 'Réforme électorale : les enjeux du nouveau code';
    excerpt = 'Analyse détaillée des modifications apportées au code électoral et leurs implications pour les prochaines élections.';
    category = 'Politique';
    imageUrl = getLocalImageUrl(1200, 800, 'politics,vote');
    tags = ['Politique', 'Élections', 'Réformes', 'Démocratie'];
    authorIndex = 0; // Marie Dupont
    publishedDate = new Date('2023-04-01T09:45:00Z');
    
    content = `# Réforme électorale : les enjeux du nouveau code

Le Parlement congolais a adopté le nouveau code électoral après plusieurs mois de débats intenses. Cette réforme, qualifiée d'historique par ses partisans, introduit des changements significatifs dans le processus électoral du pays.

## Les principales modifications

Le nouveau texte apporte plusieurs innovations majeures :

- **Introduction du vote électronique** dans les grandes villes, avec maintien du bulletin papier dans les zones rurales
- **Abaissement du seuil d'éligibilité** de 3% à 1,5% pour la représentation parlementaire
- **Renforcement de la parité** avec un quota minimum de 35% de femmes sur les listes électorales
- **Création d'une commission de contrôle indépendante** composée d'experts internationaux

## Réactions politiques

La réforme a suscité des réactions contrastées sur l'échiquier politique :

- La majorité présidentielle salue "une avancée majeure pour la démocratie congolaise"
- L'opposition dénonce "des modifications cosmétiques qui ne garantissent pas la transparence"
- Les observateurs internationaux adoptent une position prudente, saluant certaines avancées tout en exprimant des réserves

## Implications pour les prochaines échéances

Ces changements interviennent à 18 mois des prochaines élections générales, programmées pour octobre 2024. Selon les analystes, plusieurs conséquences sont à prévoir :

- Une probable fragmentation du paysage politique avec l'entrée de petits partis au parlement
- Un test grandeur nature pour le vote électronique, avec des défis logistiques considérables
- Une augmentation attendue du nombre de candidates et potentiellement d'élues

## Défis de mise en œuvre

L'application effective de cette réforme se heurte à plusieurs obstacles :

- Le **financement** du nouveau dispositif électoral, estimé à 450 millions USD
- La **formation** des agents électoraux aux nouvelles procédures
- La **sensibilisation** des électeurs, particulièrement en zones rurales
- Les **contraintes sécuritaires** dans certaines provinces

### Calendrier prévisionnel

Le président de la CENI (Commission Électorale Nationale Indépendante) a présenté un calendrier ambitieux :

1. Juin-Septembre 2023 : Révision du fichier électoral
2. Octobre-Décembre 2023 : Acquisition et déploiement du matériel
3. Janvier-Mars 2024 : Formation des agents électoraux
4. Avril-Juin 2024 : Campagne de sensibilisation
5. Juillet-Septembre 2024 : Préparatifs finaux
6. Octobre 2024 : Tenue des élections

## Regards internationaux

La communauté internationale suit cette réforme avec attention. L'Union Africaine a offert son expertise technique, tandis que l'Union Européenne a conditionné son soutien financier à des "garanties concrètes de transparence".

## Conclusion

Cette réforme électorale constitue un tournant potentiel pour la démocratie congolaise. Son succès dépendra largement de sa mise en œuvre effective et de l'appropriation du processus par l'ensemble des acteurs politiques. Les prochains mois seront cruciaux pour évaluer la détermination des autorités à transformer les ambitions législatives en réalité opérationnelle.`;
  } else if (slug.includes('technologie') || slug.includes('numerique') || slug.includes('innovation')) {
    title = 'La révolution numérique transforme le secteur bancaire congolais';
    excerpt = 'Comment les nouvelles technologies bouleversent les services financiers en RDC et favorisent l\'inclusion financière.';
    category = 'Technologie';
    imageUrl = getLocalImageUrl(1200, 800, 'technology,banking');
    tags = ['Technologie', 'Finance', 'Innovation', 'Mobile Banking'];
    authorIndex = 1; // Jean Mbala
    publishedDate = new Date('2023-03-15T14:30:00Z');
    
    content = `# La révolution numérique transforme le secteur bancaire congolais

La digitalisation des services bancaires connaît une accélération sans précédent en République Démocratique du Congo. Cette transformation numérique est en train de redessiner radicalement le paysage financier national, avec des répercussions profondes sur l'inclusion financière.

## Une adoption massive du mobile banking

Les chiffres témoignent d'une véritable révolution en cours :

- Plus de **15 millions de Congolais** utilisent désormais des services financiers mobiles, contre seulement 3 millions il y a cinq ans
- Le volume des transactions mobiles a atteint **4,2 milliards USD** en 2022, en hausse de 65% par rapport à l'année précédente
- Le nombre d'agents bancaires mobiles dépasse désormais les **75 000** à travers le pays

Cette croissance exponentielle s'explique notamment par un taux de pénétration mobile qui atteint 45% de la population, et par la facilité d'utilisation des services proposés.

## Les innovations qui changent la donne

Plusieurs innovations technologiques ont accéléré cette transformation :

### 1. L'interopérabilité des plateformes

Depuis janvier 2023, les principaux opérateurs (M-Pesa, Orange Money, Airtel Money) ont mis en place un système d'interopérabilité permettant les transferts directs entre différentes plateformes, une première en Afrique centrale.

### 2. Les solutions biométriques

L'identification par empreinte digitale ou reconnaissance faciale sécurise les transactions et facilite l'accès aux services pour les populations non alphabétisées.

### 3. Les API ouvertes

Les banques traditionnelles développent des interfaces de programmation (API) permettant à des startups fintech de créer des services innovants en s'appuyant sur leurs infrastructures.

## Impact sur l'inclusion financière

Cette révolution technologique transforme l'accès aux services financiers :

- **Le taux de bancarisation** est passé de 6% en 2018 à près de 24% aujourd'hui
- **Les femmes** représentent 41% des nouveaux utilisateurs de services financiers mobiles
- **Les zones rurales** connaissent la plus forte progression, avec un triplement du nombre d'utilisateurs en 3 ans

"La technologie a fait en quatre ans ce que les banques traditionnelles n'ont pas réussi en quatre décennies pour l'inclusion financière en RDC", observe Dr. Mukendi, économiste à l'Université de Lubumbashi.

## Défis et perspectives

Malgré ces avancées, plusieurs défis persistent :

- La **fracture numérique** reste importante, avec des disparités régionales d'accès à l'internet mobile
- Les questions de **cybersécurité** se posent avec acuité face à la multiplication des transactions
- Le cadre **réglementaire** peine à suivre le rythme des innovations

Pour Pascal Kanik, directeur de l'Association Congolaise des Fintech, "l'enjeu des prochaines années sera de maintenir l'innovation tout en renforçant la confiance des utilisateurs et la sécurité des systèmes."

## Conclusion

La transformation numérique du secteur bancaire congolais illustre parfaitement comment la technologie peut contribuer au développement économique en s'adaptant aux réalités locales. Cette révolution silencieuse pourrait constituer un modèle pour d'autres secteurs et contribuer significativement à la modernisation de l'économie nationale.`;
  } else {
    // Article par défaut
    title = 'Les défis du développement durable en République Démocratique du Congo';
    excerpt = 'Analyse des opportunités et obstacles dans la mise en œuvre des politiques de développement durable en RDC.';
    category = 'Environnement';
    imageUrl = getLocalImageUrl(1200, 800, 'nature,congo');
    tags = ['Environnement', 'Développement durable', 'Climat', 'Biodiversité'];
    authorIndex = 0; // Marie Dupont
    publishedDate = new Date('2023-02-20T11:15:00Z');
    
    content = `# Les défis du développement durable en République Démocratique du Congo

La République Démocratique du Congo (RDC), avec ses vastes forêts tropicales, ses ressources minérales abondantes et sa biodiversité exceptionnelle, se trouve à la croisée des chemins en matière de développement durable. Dotée d'atouts considérables, elle fait face à des défis majeurs pour concilier croissance économique, préservation environnementale et progrès social.

## Un potentiel environnemental exceptionnel

La RDC abrite une richesse naturelle inestimable :

- **Le bassin du Congo**, deuxième plus grande forêt tropicale au monde, couvrant 60% du territoire national
- Plus de **10 000 espèces de plantes**, dont 3 000 endémiques
- **Près de 30% des réserves mondiales d'eau douce** à travers son réseau hydrographique
- Un potentiel hydroélectrique estimé à **100 000 MW**, dont seulement 3% sont exploités

Cette richesse naturelle positionne le pays comme un acteur essentiel dans la lutte contre le changement climatique, les forêts congolaises séquestrant environ 8% du carbone mondial.

## Les principaux défis à relever

Malgré ce potentiel, le pays fait face à plusieurs obstacles dans sa transition vers un développement durable :

### 1. La pression sur les forêts

La déforestation atteint des niveaux préoccupants avec près de **400 000 hectares** perdus chaque année. Les principales causes sont :

- L'agriculture sur brûlis
- L'exploitation forestière illégale
- La production de charbon de bois
- L'expansion des zones urbaines

### 2. L'exploitation minière non régulée

Bien que le secteur minier contribue significativement à l'économie nationale, ses pratiques posent souvent problème :

- Pollution des cours d'eau par les produits chimiques
- Déplacements de populations
- Conditions de travail précaires
- Faible redistribution des revenus aux communautés locales

### 3. L'accès limité à l'énergie propre

Malgré son immense potentiel hydroélectrique, la RDC affiche un taux d'électrification parmi les plus bas au monde :

- Seulement **9% de la population** a accès à l'électricité
- 95% des ménages dépendent du bois ou du charbon pour cuisiner
- Les infrastructures énergétiques existantes sont vétustes

## Initiatives prometteuses

Plusieurs projets innovants tentent de répondre à ces défis :

- Le programme **REDD+** (Réduction des Émissions dues à la Déforestation et à la Dégradation forestière), qui a mobilisé près de 500 millions USD depuis 2016
- L'initiative **Énergie Durable pour Tous**, qui vise à développer des mini-réseaux solaires dans 1 000 villages d'ici 2025
- Le projet **Cobalt Responsable**, qui promeut des pratiques d'extraction respectueuses des droits humains et de l'environnement

### Témoignage de terrain

À Yangambi, ancienne station de recherche coloniale reconvertie en pôle scientifique de développement durable, les résultats sont encourageants. "Nous avons réussi à créer plus de 300 emplois verts tout en protégeant 235 000 hectares de forêt", explique Dr. Lumande, responsable du projet. "C'est la preuve qu'on peut concilier conservation et développement économique."

## Perspectives et recommandations

Pour accélérer la transition vers un développement véritablement durable, plusieurs actions sont prioritaires :

1. **Renforcer la gouvernance environnementale** et l'application des lois existantes
2. **Développer l'écotourisme** comme alternative économique durable
3. **Investir massivement dans les énergies renouvelables**, particulièrement l'hydroélectricité et le solaire
4. **Valoriser les savoirs traditionnels** des communautés locales dans la gestion des ressources naturelles
5. **Promouvoir l'agroforesterie** pour concilier production alimentaire et préservation forestière

## Conclusion

La RDC dispose d'atouts considérables pour devenir un modèle de développement durable en Afrique. Transformer ces potentialités en réalités tangibles nécessitera une vision stratégique claire, une gouvernance améliorée et un soutien international conséquent. L'avenir du pays, mais aussi celui du climat mondial, dépend en partie de la capacité à relever ces défis.`;
  }
  
  // Créer un ID unique basé sur le slug
  const id = slug.substring(0, 8);
  
  // Retourner l'article simulé complet
  return {
    id,
    title,
    excerpt,
    content,
    slug,
    category,
    imageUrl,
    publishedAt: publishedDate.toISOString(),
    author: authors[authorIndex],
    tags,
    views: Math.floor(Math.random() * 1000) + 100
  };
} 