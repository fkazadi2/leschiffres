import Image from 'next/image';
import Link from 'next/link';
import AdWrapper from '@/components/ads/AdWrapper';

// Données d'exemple pour les articles d'économie
const economieArticles = [
  {
    id: 1,
    title: "L'impact de l'inflation sur le pouvoir d'achat des ménages",
    slug: "impact-inflation-pouvoir-achat",
    category: "Économie",
    excerpt: "Analyse détaillée des conséquences de la hausse des prix sur le budget des ménages et les perspectives économiques à moyen terme.",
    imageUrl: "https://source.unsplash.com/random/800x600/?economy,inflation",
    publishedAt: "2023-09-15T08:30:00Z",
  },
  {
    id: 2,
    title: "La transition vers une économie verte : opportunités et défis",
    slug: "transition-economie-verte",
    category: "Économie",
    excerpt: "Comment les entreprises et les gouvernements s'adaptent aux exigences environnementales tout en préservant la croissance économique.",
    imageUrl: "https://source.unsplash.com/random/800x600/?green,economy",
    publishedAt: "2023-09-12T10:15:00Z",
  },
  {
    id: 3,
    title: "Le marché immobilier face à la hausse des taux d'intérêt",
    slug: "marche-immobilier-taux-interet",
    category: "Économie",
    excerpt: "Quel avenir pour les investissements immobiliers dans un contexte de durcissement des politiques monétaires ?",
    imageUrl: "https://source.unsplash.com/random/800x600/?realestate,finance",
    publishedAt: "2023-09-08T09:45:00Z",
  },
  {
    id: 4,
    title: "Les cryptomonnaies : révolution financière ou bulle spéculative ?",
    slug: "cryptomonnaies-revolution-bulle",
    category: "Économie",
    excerpt: "Décryptage du phénomène des monnaies numériques et de leur impact potentiel sur le système financier traditionnel.",
    imageUrl: "https://source.unsplash.com/random/800x600/?cryptocurrency,bitcoin",
    publishedAt: "2023-09-05T14:20:00Z",
  },
  {
    id: 5,
    title: "Les stratégies d'entreprise face aux pénuries de main-d'œuvre",
    slug: "strategies-entreprises-penuries-main-oeuvre",
    category: "Économie",
    excerpt: "Comment les entreprises innovent pour attirer et retenir les talents dans un marché du travail de plus en plus tendu.",
    imageUrl: "https://source.unsplash.com/random/800x600/?business,workforce",
    publishedAt: "2023-09-01T11:10:00Z",
  },
  {
    id: 6,
    title: "L'économie circulaire : modèle d'avenir pour les entreprises",
    slug: "economie-circulaire-modele-avenir",
    category: "Économie",
    excerpt: "Les principes de l'économie circulaire et les exemples d'entreprises qui transforment leurs modèles d'affaires pour réduire leur impact environnemental.",
    imageUrl: "https://source.unsplash.com/random/800x600/?circular,economy",
    publishedAt: "2023-08-28T13:25:00Z",
  },
];

// Fonction pour formater les dates
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export default function EconomiePage() {
  return (
    <div className="min-h-screen py-12">
      {/* Bannière de la catégorie */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://source.unsplash.com/random/1920x1080/?economy,finance" 
            alt="Économie" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-800/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Économie</h1>
            <p className="text-xl text-white/80">
              Actualités, analyses et décryptages des tendances économiques nationales et internationales.
            </p>
          </div>
        </div>
      </section>
      
      {/* Publicité en haut de page */}
      <div className="container mx-auto px-4 py-8">
        <AdWrapper position="header" />
      </div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {economieArticles.map(article => (
            <article key={article.id} className="bg-[var(--card-bg)] rounded-3xl overflow-hidden card-3d fade-in shadow-lg">
              <div className="relative aspect-video">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-[var(--text-muted)] text-sm">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-color)] mb-3">{article.title}</h3>
                <p className="text-[var(--text-muted)] line-clamp-3 mb-4">{article.excerpt}</p>
                <Link href={`/article/${article.slug}`} className="text-blue-600 hover:underline text-sm inline-flex items-center">
                  Lire l'article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {/* Publicité au milieu de la page */}
        <div className="my-16">
          <AdWrapper position="content" />
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)]">1</button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors">2</button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors">3</button>
          <span className="text-[var(--text-muted)]">...</span>
          <button className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors">8</button>
        </div>
      </div>
      
      {/* Publicité en bas de page */}
      <div className="container mx-auto px-4 py-8 mt-8">
        <AdWrapper position="footer" />
      </div>
    </div>
  );
} 