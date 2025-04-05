import HeroBanner from '@/components/home/HeroBanner';
import FeaturedArticles from '@/components/home/FeaturedArticles';
import Dashboard from '@/components/dashboard/Dashboard';
import { getArticles } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import AdWrapper from '@/components/ads/AdWrapper';
import { getLocalImageUrl } from '@/lib/imageUtils';

// Données d'exemple pour les articles
const mockArticles = [
  {
    id: '1',
    title: 'La croissance économique en RDC atteint 5.7% au premier trimestre 2023',
    excerpt: 'Analyse des facteurs de croissance et perspectives pour le reste de l\'année selon les dernières données de la Banque Centrale du Congo.',
    slug: 'croissance-economique-rdc-2023',
    category: 'Économie',
    imageUrl: getLocalImageUrl(1200, 800, 'economy'),
    publishedAt: '2023-04-12T08:00:00Z',
  },
  {
    id: '2',
    title: 'Impact du changement climatique sur l\'agriculture locale',
    excerpt: 'Étude des conséquences du réchauffement climatique sur la production agricole nationale et les solutions d\'adaptation envisagées.',
    slug: 'impact-climat-agriculture',
    category: 'Environnement',
    imageUrl: getLocalImageUrl(1200, 800, 'climate'),
    publishedAt: '2023-04-08T10:30:00Z',
  },
  {
    id: '3',
    title: 'Les défis de l\'éducation numérique post-Covid',
    excerpt: 'Comment le système éducatif s\'adapte aux nouvelles réalités après la pandémie, entre innovations et contraintes techniques.',
    slug: 'education-numerique-post-covid',
    category: 'Social',
    imageUrl: getLocalImageUrl(1200, 800, 'education'),
    publishedAt: '2023-04-05T14:15:00Z',
  },
  {
    id: '4',
    title: 'Réforme électorale : les enjeux du nouveau code',
    excerpt: 'Analyse détaillée des modifications apportées au code électoral et leurs implications pour les prochaines élections.',
    slug: 'reforme-electorale-enjeux',
    category: 'Politique',
    imageUrl: getLocalImageUrl(1200, 800, 'vote'),
    publishedAt: '2023-04-01T09:45:00Z',
  },
  {
    id: '5',
    title: 'L\'industrie minière face aux exigences environnementales',
    excerpt: 'Comment le secteur minier s\'adapte aux nouvelles réglementations environnementales et les défis de la transition écologique.',
    slug: 'industrie-miniere-environnement',
    category: 'Économie',
    imageUrl: getLocalImageUrl(1200, 800, 'mining'),
    publishedAt: '2023-03-28T11:20:00Z',
  },
  {
    id: '6',
    title: 'Inflation : comprendre la hausse des prix et son impact sur le pouvoir d\'achat',
    excerpt: 'Décryptage du phénomène inflationniste qui touche l\'économie nationale et ses conséquences sur la vie quotidienne des citoyens.',
    slug: 'inflation-hausse-prix-pouvoir-achat',
    category: 'Économie',
    imageUrl: getLocalImageUrl(1200, 800, 'inflation'),
    publishedAt: '2023-03-25T09:15:00Z',
  },
  {
    id: '7',
    title: 'Exportations : le secteur agroalimentaire en pleine expansion',
    excerpt: 'Les produits agricoles transformés deviennent un moteur de croissance pour les exportations nationales avec une hausse de 12%.',
    slug: 'exportations-agroalimentaire-expansion',
    category: 'Économie',
    imageUrl: getLocalImageUrl(1200, 800, 'agriculture,export'),
    publishedAt: '2023-03-20T11:30:00Z',
  },
  {
    id: '8',
    title: 'Banque centrale : nouvelles mesures pour stabiliser la monnaie nationale',
    excerpt: 'Face aux fluctuations du marché des changes, la Banque centrale met en place un dispositif de régulation monétaire innovant.',
    slug: 'banque-centrale-stabilisation-monnaie',
    category: 'Économie',
    imageUrl: getLocalImageUrl(1200, 800, 'bank,currency'),
    publishedAt: '2023-03-18T14:20:00Z',
  },
];

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Filtrer les articles de la catégorie Économie
const economyArticles = mockArticles.filter(article => article.category === 'Économie');

// Filtrer les articles de la catégorie Politique
const politicsArticles = mockArticles.filter(article => article.category === 'Politique');

// Filtrer les articles de la catégorie Sport
const sportsArticles = mockArticles.filter(article => article.category === 'Sport');

// Ajouter un article supplémentaire à la catégorie Économie si nécessaire
if (economyArticles.length < 6) {
  economyArticles.push({
    id: '9',
    title: 'Investissements internationaux : la RDC attire de nouveaux partenaires',
    excerpt: 'De nouveaux accords commerciaux ont été signés, renforçant la position économique du pays sur la scène internationale.',
    slug: 'investissements-internationaux-rdc',
    category: 'Économie',
    imageUrl: getLocalImageUrl(1200, 800, 'investment,business'),
    publishedAt: '2023-03-15T10:45:00Z',
  });
}

// Ajouter des articles supplémentaires à la catégorie Politique si nécessaire
while (politicsArticles.length < 6) {
  const newId = (9 + politicsArticles.length).toString();
  politicsArticles.push({
    id: newId,
    title: politicsArticles.length === 0 
      ? 'Réformes administratives : le gouvernement annonce un nouveau plan d\'action'
      : politicsArticles.length === 1
      ? 'Coopération régionale : nouveaux accords signés avec les pays voisins'
      : politicsArticles.length === 2
      ? 'Décentralisation : analyse des avancées et défis dans les provinces'
      : politicsArticles.length === 3
      ? 'Les jeunes et la politique : une nouvelle génération de leaders émerge'
      : politicsArticles.length === 4
      ? 'Relations internationales : la RDC renforce son positionnement diplomatique'
      : 'Réforme constitutionnelle : débats et enjeux pour l\'avenir du pays',
    excerpt: politicsArticles.length === 0
      ? 'Le gouvernement vient de dévoiler un ambitieux programme de réformes administratives visant à moderniser les institutions publiques et améliorer les services aux citoyens.'
      : politicsArticles.length === 1
      ? 'Une série d\'accords de coopération a été signée lors du dernier sommet régional, renforçant les liens économiques et sécuritaires dans la région.'
      : politicsArticles.length === 2
      ? 'Cinq ans après le lancement du processus de décentralisation, notre analyse fait le point sur les progrès réalisés et les obstacles rencontrés.'
      : politicsArticles.length === 3
      ? 'De plus en plus de jeunes s\'engagent en politique, apportant de nouvelles idées et approches dans un paysage politique en mutation.'
      : politicsArticles.length === 4
      ? 'Les récentes initiatives diplomatiques de la RDC témoignent d\'une volonté d\'accroître son influence sur la scène internationale.'
      : 'Le débat sur la réforme constitutionnelle s\'intensifie alors que différentes parties prenantes exposent leurs visions pour l\'avenir des institutions.',
    slug: politicsArticles.length === 0
      ? 'reformes-administratives-plan-action'
      : politicsArticles.length === 1
      ? 'cooperation-regionale-nouveaux-accords'
      : politicsArticles.length === 2
      ? 'decentralisation-avancees-defis-provinces'
      : politicsArticles.length === 3
      ? 'jeunes-politique-nouvelle-generation'
      : politicsArticles.length === 4
      ? 'relations-internationales-positionnement-diplomatique'
      : 'reforme-constitutionnelle-debats-enjeux',
    category: 'Politique',
    imageUrl: getLocalImageUrl(1200, 800, `politics,government${politicsArticles.length}`),
    publishedAt: new Date(Date.now() - (politicsArticles.length * 86400000)).toISOString(),
  });
}

// Ajouter des articles supplémentaires à la catégorie Sport si nécessaire
while (sportsArticles.length < 3) {
  const newId = (15 + sportsArticles.length).toString();
  sportsArticles.push({
    id: newId,
    title: sportsArticles.length === 0 
      ? 'Le championnat national de football attire de nouveaux sponsors'
      : sportsArticles.length === 1
      ? 'Les jeunes espoirs congolais brillent aux compétitions africaines'
      : 'La RDC se prépare pour les prochains Jeux Olympiques',
    excerpt: sportsArticles.length === 0
      ? 'Plusieurs grandes entreprises nationales et internationales ont annoncé leur soutien financier au championnat national de football, témoignant de l\'attractivité croissante de ce sport dans le pays.'
      : sportsArticles.length === 1
      ? 'Les athlètes congolais de moins de 20 ans ont remporté plusieurs médailles lors des dernières compétitions continentales, promettant un avenir brillant pour le sport national.'
      : 'La délégation olympique de la RDC intensifie sa préparation à un an des Jeux, avec des ambitions accrues et un soutien gouvernemental renforcé.',
    slug: sportsArticles.length === 0
      ? 'championnat-football-nouveaux-sponsors'
      : sportsArticles.length === 1
      ? 'jeunes-espoirs-competitions-africaines'
      : 'preparation-jeux-olympiques',
    category: 'Sport',
    imageUrl: getLocalImageUrl(1200, 800, `sports,athletes${sportsArticles.length}`),
    publishedAt: new Date(Date.now() - (sportsArticles.length * 86400000)).toISOString(),
  });
}

export default function Home() {
  // Dans une application réelle, vous utiliseriez getArticles() pour récupérer 
  // les données depuis Supabase, mais ici nous utilisons mockArticles pour l'exemple

  return (
    <>
      <HeroBanner />
      
      {/* Bannière publicitaire sous le Hero */}
      <AdWrapper position="header" />
      
      <FeaturedArticles articles={mockArticles} />
      
      <Dashboard />
      
      {/* Section Économie */}
      <section className="py-16 relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute w-96 h-96 rounded-full bg-[var(--secondary)] opacity-5 filter blur-[100px] -top-32 -right-32 z-0"></div>
        <div className="absolute w-80 h-80 rounded-full bg-[var(--secondary)] opacity-5 filter blur-[100px] bottom-20 left-20 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-48 right-10 w-40 h-40 rounded-full border border-[rgba(255,255,255,0.05)]"></div>
          <div className="absolute bottom-60 left-20 w-60 h-60 rounded-full border border-[rgba(255,255,255,0.03)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
              Économie
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[var(--secondary)]"></span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-3xl">
              Explorez les tendances économiques, les analyses de marché et les prévisions financières pour rester informé.
            </p>
          </div>
          
          <div className="relative">
            {/* Layout horizontal pour les 6 articles */}
            <div className="flex flex-wrap gap-6">
              {/* Première rangée de 3 articles */}
              <div className="w-full flex flex-nowrap overflow-x-auto space-x-6 pb-6 custom-scrollbar">
                <div className="w-[350px] h-[450px] flex-shrink-0 relative rounded-3xl overflow-hidden group cyberpunk-border card-3d fade-in delay-100">
                  <Link href={`/article/${economyArticles[0].slug}`} className="block w-full h-full">
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={economyArticles[0].imageUrl}
                        alt={economyArticles[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                      <div className="flex items-center mb-3">
                        <span className="bg-[var(--secondary)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                          {economyArticles[0].category}
                        </span>
                        <span className="ml-3 text-gray-300 text-sm">
                          {formatDate(economyArticles[0].publishedAt)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{economyArticles[0].title}</h3>
                      <p className="text-gray-300 line-clamp-3">{economyArticles[0].excerpt}</p>
                    </div>
                  </Link>
                </div>
                
                <div className="w-[350px] h-[450px] flex-shrink-0 relative rounded-3xl overflow-hidden group cyberpunk-border card-3d fade-in delay-200">
                  <Link href={`/article/${economyArticles[1].slug}`} className="block w-full h-full">
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={economyArticles[1].imageUrl}
                        alt={economyArticles[1].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                      <div className="flex items-center mb-3">
                        <span className="bg-[var(--secondary)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                          {economyArticles[1].category}
                        </span>
                        <span className="ml-3 text-gray-300 text-sm">
                          {formatDate(economyArticles[1].publishedAt)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{economyArticles[1].title}</h3>
                      <p className="text-gray-300 line-clamp-3">{economyArticles[1].excerpt}</p>
                    </div>
                  </Link>
                </div>
                
                <div className="w-[350px] h-[450px] flex-shrink-0 relative rounded-3xl overflow-hidden group cyberpunk-border card-3d fade-in delay-300">
                  <Link href={`/article/${economyArticles[2].slug}`} className="block w-full h-full">
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={economyArticles[2].imageUrl}
                        alt={economyArticles[2].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                      <div className="flex items-center mb-3">
                        <span className="bg-[var(--secondary)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                          {economyArticles[2].category}
                        </span>
                        <span className="ml-3 text-gray-300 text-sm">
                          {formatDate(economyArticles[2].publishedAt)}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{economyArticles[2].title}</h3>
                      <p className="text-gray-300 line-clamp-3">{economyArticles[2].excerpt}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center fade-in delay-400">
              <Link href="/categorie/economie" className="btn-fancy inline-flex items-center justify-center px-6 py-3 border border-[var(--secondary)] text-[var(--secondary)] rounded-2xl hover:bg-[rgba(124,58,237,0.1)] transition-colors text-sm group">
                <span className="group-hover:translate-x-1 transition-transform">Voir tous les articles économiques</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Publicité entre sections d'articles */}
      <div className="my-16">
        <AdWrapper position="content" />
      </div>
      
      {/* Section Politique */}
      <section className="py-16 relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute w-96 h-96 rounded-full bg-[var(--accent)] opacity-5 filter blur-[100px] -bottom-32 -left-32 z-0"></div>
        <div className="absolute w-80 h-80 rounded-full bg-[var(--primary)] opacity-5 filter blur-[100px] top-20 right-20 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute bottom-48 left-10 w-40 h-40 rounded-full border border-[rgba(var(--text-color-rgb),0.05)]"></div>
          <div className="absolute top-60 right-20 w-60 h-60 rounded-full border border-[rgba(var(--text-color-rgb),0.03)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
              Politique
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[var(--accent)]"></span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-3xl">
              Suivez l'actualité politique, les décisions gouvernementales et les débats parlementaires pour comprendre les enjeux nationaux.
            </p>
          </div>
          
          <div className="relative">
            {/* Article principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <article className="bg-[var(--card-bg)] rounded-3xl overflow-hidden card-3d fade-in delay-100 border-shine">
                <div className="relative h-80 md:h-full">
                  <Image
                    src={politicsArticles[0].imageUrl}
                    alt={politicsArticles[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.2)]"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <span className="bg-[var(--accent)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {politicsArticles[0].category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-3">{politicsArticles[0].title}</h3>
                  </div>
                </div>
              </article>
              
              <div className="grid grid-cols-1 gap-6">
                <article className="bg-[var(--card-bg)] rounded-3xl p-6 card-3d fade-in delay-200 border-shine">
                  <div className="flex items-center mb-3">
                    <span className="bg-[var(--accent)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {politicsArticles[1].category}
                    </span>
                    <span className="ml-3 text-[var(--text-muted)] text-sm">
                      {formatDate(politicsArticles[1].publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">{politicsArticles[1].title}</h3>
                  <p className="text-[var(--text-muted)] line-clamp-2">{politicsArticles[1].excerpt}</p>
                  <Link href={`/article/${politicsArticles[1].slug}`} className="text-[var(--accent)] text-sm mt-3 inline-block hover:underline">
                    Lire l'article
                  </Link>
                </article>
                
                <article className="bg-[var(--card-bg)] rounded-3xl p-6 card-3d fade-in delay-300 border-shine">
                  <div className="flex items-center mb-3">
                    <span className="bg-[var(--accent)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {politicsArticles[2].category}
                    </span>
                    <span className="ml-3 text-[var(--text-muted)] text-sm">
                      {formatDate(politicsArticles[2].publishedAt)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">{politicsArticles[2].title}</h3>
                  <p className="text-[var(--text-muted)] line-clamp-2">{politicsArticles[2].excerpt}</p>
                  <Link href={`/article/${politicsArticles[2].slug}`} className="text-[var(--accent)] text-sm mt-3 inline-block hover:underline">
                    Lire l'article
                  </Link>
                </article>
              </div>
            </div>
            
            <div className="mt-10 text-center fade-in delay-400">
              <Link href="/categorie/politique" className="btn-fancy inline-flex items-center justify-center px-6 py-3 border border-[var(--accent)] text-[var(--accent)] rounded-2xl hover:bg-[rgba(98,84,243,0.1)] transition-colors text-sm group">
                <span className="group-hover:translate-x-1 transition-transform">Voir tous les articles politiques</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Publicité entre sections d'articles */}
      <div className="my-16">
        <AdWrapper position="content" />
      </div>
      
      {/* Section Sport */}
      <section className="py-16 relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute w-96 h-96 rounded-full bg-[var(--primary)] opacity-5 filter blur-[100px] -top-32 -left-32 z-0"></div>
        <div className="absolute w-80 h-80 rounded-full bg-[var(--secondary)] opacity-5 filter blur-[100px] bottom-20 right-20 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute bottom-60 right-10 w-40 h-40 rounded-full border border-[rgba(var(--text-color-rgb),0.05)]"></div>
          <div className="absolute top-20 left-[30%] w-60 h-60 rounded-full border border-[rgba(var(--text-color-rgb),0.03)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
              Sport
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[var(--primary)]"></span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-3xl">
              Toute l'actualité sportive nationale et internationale, résultats, analyses et interviews.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-[var(--card-bg)] rounded-3xl overflow-hidden card-3d fade-in delay-100 border-shine">
              <div className="relative aspect-video">
                <Image
                  src={sportsArticles[0].imageUrl}
                  alt={sportsArticles[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-[var(--primary)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {sportsArticles[0].category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-[var(--text-muted)] text-sm">
                    {formatDate(sportsArticles[0].publishedAt)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-color)] mb-3">{sportsArticles[0].title}</h3>
                <p className="text-[var(--text-muted)] line-clamp-2 mb-4">{sportsArticles[0].excerpt}</p>
                <Link href={`/article/${sportsArticles[0].slug}`} className="text-[var(--primary)] text-sm hover:underline">
                  Lire l'article
                </Link>
              </div>
            </article>
            
            <article className="bg-[var(--card-bg)] rounded-3xl overflow-hidden card-3d fade-in delay-200 border-shine">
              <div className="relative aspect-video">
                <Image
                  src={sportsArticles[1].imageUrl}
                  alt={sportsArticles[1].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-[var(--primary)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {sportsArticles[1].category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-[var(--text-muted)] text-sm">
                    {formatDate(sportsArticles[1].publishedAt)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-color)] mb-3">{sportsArticles[1].title}</h3>
                <p className="text-[var(--text-muted)] line-clamp-2 mb-4">{sportsArticles[1].excerpt}</p>
                <Link href={`/article/${sportsArticles[1].slug}`} className="text-[var(--primary)] text-sm hover:underline">
                  Lire l'article
                </Link>
              </div>
            </article>
            
            <article className="bg-[var(--card-bg)] rounded-3xl overflow-hidden card-3d fade-in delay-300 border-shine">
              <div className="relative aspect-video">
                <Image
                  src={sportsArticles[2].imageUrl}
                  alt={sportsArticles[2].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-[var(--primary)] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {sportsArticles[2].category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-[var(--text-muted)] text-sm">
                    {formatDate(sportsArticles[2].publishedAt)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-color)] mb-3">{sportsArticles[2].title}</h3>
                <p className="text-[var(--text-muted)] line-clamp-2 mb-4">{sportsArticles[2].excerpt}</p>
                <Link href={`/article/${sportsArticles[2].slug}`} className="text-[var(--primary)] text-sm hover:underline">
                  Lire l'article
                </Link>
              </div>
            </article>
          </div>
            
          <div className="mt-10 text-center fade-in delay-400">
            <Link href="/categorie/sport" className="btn-fancy inline-flex items-center justify-center px-6 py-3 border border-[var(--primary)] text-[var(--primary)] rounded-2xl hover:bg-[rgba(255,56,146,0.1)] transition-colors text-sm group">
              <span className="group-hover:translate-x-1 transition-transform">Voir tous les articles sportifs</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Publicité entre sections */}
      <div className="my-16">
        <AdWrapper position="content" />
      </div>

      {/* Section Social */}
      <section className="py-16 relative overflow-hidden" id="social">
        <div className="absolute w-96 h-96 rounded-full bg-[#6253e1] opacity-5 filter blur-[100px] -bottom-32 -right-32 z-0"></div>
        <div className="absolute w-80 h-80 rounded-full bg-[#3a95f2] opacity-5 filter blur-[100px] top-20 left-20 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-60 left-10 w-40 h-40 rounded-full border border-[rgba(var(--text-color-rgb),0.05)]"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full border border-[rgba(var(--text-color-rgb),0.03)]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
              Social
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#6253e1]"></span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-3xl">
              Les faits sociaux et les enjeux qui impactent nos communautés et notre société.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
            <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg card-3d">
              <Image
                src="https://source.unsplash.com/random/1200x800/?society"
                alt="Article social"
                width={600}
                height={300}
                className="w-full object-cover h-56"
              />
              <div className="p-6">
                <span className="bg-[#6253e1] text-white text-xs font-medium px-3 py-1.5 rounded-full">Social</span>
                <h3 className="text-xl font-bold mt-3 mb-2">Les défis du logement social en zone urbaine</h3>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
                  Analyse des politiques d'habitat et des solutions innovantes pour répondre aux besoins croissants de logements abordables.
                </p>
                <Link href="/categorie/social" className="text-[#6253e1] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-md card-3d">
                <span className="bg-[#6253e1] text-white text-xs font-medium px-3 py-1.5 rounded-full">Social</span>
                <h3 className="text-lg font-bold mt-3 mb-2">L'accès à l'eau potable en milieu rural</h3>
                <p className="text-[var(--text-muted)] line-clamp-2 mb-3">
                  État des lieux et perspectives pour améliorer l'approvisionnement en eau dans les régions les plus défavorisées.
                </p>
                <Link href="/categorie/social" className="text-[#6253e1] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
              
              <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-md card-3d">
                <span className="bg-[#6253e1] text-white text-xs font-medium px-3 py-1.5 rounded-full">Social</span>
                <h3 className="text-lg font-bold mt-3 mb-2">L'insertion professionnelle des jeunes diplômés</h3>
                <p className="text-[var(--text-muted)] line-clamp-2 mb-3">
                  Les stratégies mises en place pour faciliter l'entrée des jeunes sur le marché du travail face aux défis économiques actuels.
                </p>
                <Link href="/categorie/social" className="text-[#6253e1] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center fade-in delay-300">
            <Link href="/categorie/social" className="btn-fancy inline-flex items-center justify-center px-6 py-3 border border-[#6253e1] text-[#6253e1] rounded-2xl hover:bg-[rgba(98,83,225,0.1)] transition-colors text-sm group">
              <span className="group-hover:translate-x-1 transition-transform">Voir tous les articles sur le social</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Publicité entre sections */}
      <div className="my-16">
        <AdWrapper position="content" />
      </div>

      {/* Section Technologie */}
      <section className="py-16 relative overflow-hidden" id="technologie">
        <div className="absolute w-96 h-96 rounded-full bg-[#42b883] opacity-5 filter blur-[100px] -top-32 -right-32 z-0"></div>
        <div className="absolute w-80 h-80 rounded-full bg-[#3a95f2] opacity-5 filter blur-[100px] bottom-20 left-20 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
              Technologie
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#42b883]"></span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-3xl">
              Les dernières innovations, tendances et analyses du monde technologique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in">
            <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg card-3d delay-100">
              <Image
                src="https://source.unsplash.com/random/1200x800/?technology"
                alt="Article technologie"
                width={400}
                height={225}
                className="w-full object-cover h-48"
              />
              <div className="p-6">
                <span className="bg-[#42b883] text-white text-xs font-medium px-3 py-1.5 rounded-full">Technologie</span>
                <h3 className="text-lg font-bold mt-3 mb-2">L'intelligence artificielle révolutionne la santé</h3>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-2">
                  Comment les algorithmes d'IA transforment le diagnostic médical et la recherche pharmaceutique.
                </p>
                <Link href="/categorie/technologie" className="text-[#42b883] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg card-3d delay-200">
        <Image
                src="https://source.unsplash.com/random/1200x800/?blockchain"
                alt="Article blockchain"
                width={400}
                height={225}
                className="w-full object-cover h-48"
              />
              <div className="p-6">
                <span className="bg-[#42b883] text-white text-xs font-medium px-3 py-1.5 rounded-full">Technologie</span>
                <h3 className="text-lg font-bold mt-3 mb-2">La blockchain au service de la transparence administrative</h3>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-2">
                  Applications concrètes de la technologie blockchain dans la gestion des documents publics.
                </p>
                <Link href="/categorie/technologie" className="text-[#42b883] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg card-3d delay-300">
            <Image
                src="https://source.unsplash.com/random/1200x800/?fintech"
                alt="Article fintech"
                width={400}
                height={225}
                className="w-full object-cover h-48"
              />
              <div className="p-6">
                <span className="bg-[#42b883] text-white text-xs font-medium px-3 py-1.5 rounded-full">Technologie</span>
                <h3 className="text-lg font-bold mt-3 mb-2">Les fintech, nouveau moteur de l'inclusion financière</h3>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-2">
                  Comment les startups financières innovantes facilitent l'accès aux services bancaires pour tous.
                </p>
                <Link href="/categorie/technologie" className="text-[#42b883] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center fade-in delay-400">
            <Link href="/categorie/technologie" className="btn-fancy inline-flex items-center justify-center px-6 py-3 border border-[#42b883] text-[#42b883] rounded-2xl hover:bg-[rgba(66,184,131,0.1)] transition-colors text-sm group">
              <span className="group-hover:translate-x-1 transition-transform">Voir tous les articles sur la technologie</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Publicité entre sections */}
      <div className="my-16">
        <AdWrapper position="content" />
      </div>

      {/* Section Justice */}
      <section className="py-16 relative overflow-hidden" id="justice">
        <div className="absolute w-96 h-96 rounded-full bg-[#8e44ad] opacity-5 filter blur-[100px] -bottom-32 -left-32 z-0"></div>
        <div className="absolute w-80 h-80 rounded-full bg-[#9b59b6] opacity-5 filter blur-[100px] top-20 right-20 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
              Justice
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#8e44ad]"></span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-3xl">
              L'actualité judiciaire, les grandes affaires et les évolutions du droit.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
            <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg card-3d delay-100">
              <Image
                src="https://source.unsplash.com/random/1200x800/?justice"
                alt="Article justice"
                width={400}
                height={225}
                className="w-full object-cover h-48"
              />
              <div className="p-6">
                <span className="bg-[#8e44ad] text-white text-xs font-medium px-3 py-1.5 rounded-full">Justice</span>
                <h3 className="text-lg font-bold mt-3 mb-2">Réforme de la justice commerciale : ce qui change</h3>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-2">
                  Les nouvelles dispositions légales qui simplifient les procédures pour les entreprises.
                </p>
                <Link href="/categorie/justice" className="text-[#8e44ad] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg card-3d delay-200">
          <Image
                src="https://source.unsplash.com/random/1200x800/?courthouse"
                alt="Article tribunal"
                width={400}
                height={225}
                className="w-full object-cover h-48"
              />
              <div className="p-6">
                <span className="bg-[#8e44ad] text-white text-xs font-medium px-3 py-1.5 rounded-full">Justice</span>
                <h3 className="text-lg font-bold mt-3 mb-2">Modernisation des tribunaux : l'ère numérique</h3>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-2">
                  La digitalisation des procédures judiciaires pour une justice plus accessible et efficiente.
                </p>
                <Link href="/categorie/justice" className="text-[#8e44ad] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg card-3d delay-300">
          <Image
                src="https://source.unsplash.com/random/1200x800/?law"
                alt="Article droit"
                width={400}
                height={225}
                className="w-full object-cover h-48"
              />
              <div className="p-6">
                <span className="bg-[#8e44ad] text-white text-xs font-medium px-3 py-1.5 rounded-full">Justice</span>
                <h3 className="text-lg font-bold mt-3 mb-2">Les défis de l'accès à la justice pour tous</h3>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-2">
                  Analyse des obstacles juridiques et économiques qui limitent l'accès aux services judiciaires.
                </p>
                <Link href="/categorie/justice" className="text-[#8e44ad] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center fade-in delay-400">
            <Link href="/categorie/justice" className="btn-fancy inline-flex items-center justify-center px-6 py-3 border border-[#8e44ad] text-[#8e44ad] rounded-2xl hover:bg-[rgba(142,68,173,0.1)] transition-colors text-sm group">
              <span className="group-hover:translate-x-1 transition-transform">Voir tous les articles sur la justice</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Publicité entre sections */}
      <div className="my-16">
        <AdWrapper position="content" />
      </div>

      {/* Section Environnement */}
      <section className="py-16 relative overflow-hidden" id="environnement">
        <div className="absolute w-96 h-96 rounded-full bg-[#27ae60] opacity-5 filter blur-[100px] -top-32 -right-32 z-0"></div>
        <div className="absolute w-80 h-80 rounded-full bg-[#2ecc71] opacity-5 filter blur-[100px] bottom-20 left-20 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
              Environnement
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#27ae60]"></span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-3xl">
              Les enjeux environnementaux, les initiatives durables et la protection de la biodiversité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in">
            <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg card-3d">
          <Image
                src="https://source.unsplash.com/random/1200x800/?environment,nature"
                alt="Article environnement"
                width={600}
                height={300}
                className="w-full object-cover h-56"
              />
              <div className="p-6">
                <span className="bg-[#27ae60] text-white text-xs font-medium px-3 py-1.5 rounded-full">Environnement</span>
                <h3 className="text-xl font-bold mt-3 mb-2">La protection des forêts tropicales : un enjeu mondial</h3>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
                  Les efforts internationaux pour préserver les poumons verts de la planète face à la déforestation.
                </p>
                <Link href="/categorie/environnement" className="text-[#27ae60] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-md card-3d">
                <span className="bg-[#27ae60] text-white text-xs font-medium px-3 py-1.5 rounded-full">Environnement</span>
                <h3 className="text-lg font-bold mt-3 mb-2">Énergies renouvelables : vers l'autonomie énergétique</h3>
                <p className="text-[var(--text-muted)] line-clamp-2 mb-3">
                  Les avancées dans le domaine des énergies solaire et éolienne pour réduire la dépendance aux combustibles fossiles.
                </p>
                <Link href="/categorie/environnement" className="text-[#27ae60] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
              
              <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-md card-3d">
                <span className="bg-[#27ae60] text-white text-xs font-medium px-3 py-1.5 rounded-full">Environnement</span>
                <h3 className="text-lg font-bold mt-3 mb-2">Pollution plastique : solutions innovantes</h3>
                <p className="text-[var(--text-muted)] line-clamp-2 mb-3">
                  Les technologies émergentes qui transforment la gestion des déchets plastiques et réduisent leur impact environnemental.
                </p>
                <Link href="/categorie/environnement" className="text-[#27ae60] hover:underline text-sm">
                  Lire l'article
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center fade-in delay-300">
            <Link href="/categorie/environnement" className="btn-fancy inline-flex items-center justify-center px-6 py-3 border border-[#27ae60] text-[#27ae60] rounded-2xl hover:bg-[rgba(39,174,96,0.1)] transition-colors text-sm group">
              <span className="group-hover:translate-x-1 transition-transform">Voir tous les articles sur l'environnement</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Autres Catégories */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-8 fade-in">
            <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
              Autres catégories
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[var(--primary)]"></span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-3xl">
              Explorez nos autres rubriques pour une information complète et diversifiée.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
            <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-md card-3d delay-100 border-shine hover:border-[var(--primary)]">
              <div className="bg-[rgba(var(--text-color-rgb),0.05)] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e74c3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Santé</h3>
              <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
                Actualités médicales, prévention et politiques de santé publique.
              </p>
              <Link href="/categorie/sante" className="text-[var(--primary)] hover:underline text-sm inline-flex items-center">
                Découvrir
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-md card-3d delay-200 border-shine hover:border-[var(--primary)]">
              <div className="bg-[rgba(var(--text-color-rgb),0.05)] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#f39c12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Éducation</h3>
              <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
                Innovations pédagogiques, politiques éducatives et réformes scolaires.
              </p>
              <Link href="/categorie/education" className="text-[var(--primary)] hover:underline text-sm inline-flex items-center">
                Découvrir
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-md card-3d delay-300 border-shine hover:border-[var(--primary)]">
              <div className="bg-[rgba(var(--text-color-rgb),0.05)] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3498db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Médias</h3>
              <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
                L'évolution des médias, la liberté de presse et les transformations numériques.
              </p>
              <Link href="/categorie/medias" className="text-[var(--primary)] hover:underline text-sm inline-flex items-center">
                Découvrir
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-[var(--card-bg)] rounded-3xl p-6 shadow-md card-3d delay-400 border-shine hover:border-[var(--primary)]">
              <div className="bg-[rgba(var(--text-color-rgb),0.05)] rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#7f8c8d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Histoire</h3>
              <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
                Rétrospectives historiques, analyses d'événements marquants et patrimoine culturel.
              </p>
              <Link href="/categorie/histoire" className="text-[var(--primary)] hover:underline text-sm inline-flex items-center">
                Découvrir
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="mt-10 text-center fade-in delay-500">
            <Link href="/a-propos" className="btn-fancy inline-flex items-center justify-center px-6 py-3 border border-[var(--primary)] text-[var(--primary)] rounded-2xl hover:bg-[rgba(231,27,133,0.1)] transition-colors text-sm group">
              <span className="group-hover:translate-x-1 transition-transform">En savoir plus sur nous</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Bannière publicitaire en bas de page */}
      <div className="container mx-auto px-4 mb-12">
        <AdWrapper position="footer" />
    </div>
    </>
  );
}
