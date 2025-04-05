import Image from 'next/image';
import Link from 'next/link';
import AdWrapper from '@/components/ads/AdWrapper';

// Données d'exemple pour les articles de sport
const sportArticles = [
  {
    id: 1,
    title: "Finale de la Coupe d'Afrique : un tournoi d'exception",
    slug: "finale-coupe-afrique-tournoi-exception",
    category: "Sport",
    excerpt: "Retour sur les moments forts de cette compétition qui a tenu en haleine tout le continent africain.",
    imageUrl: "https://source.unsplash.com/random/800x600/?soccer,africa",
    publishedAt: "2023-09-17T20:30:00Z",
  },
  {
    id: 2,
    title: "Jeux Olympiques 2024 : les espoirs de médailles",
    slug: "jeux-olympiques-2024-espoirs-medailles",
    category: "Sport",
    excerpt: "Présentation des athlètes qui représenteront le pays aux prochains Jeux Olympiques et leurs chances de podium.",
    imageUrl: "https://source.unsplash.com/random/800x600/?olympics,athletics",
    publishedAt: "2023-09-14T11:45:00Z",
  },
  {
    id: 3,
    title: "L'essor du basketball en Afrique",
    slug: "essor-basketball-afrique",
    category: "Sport",
    excerpt: "Comment le continent africain s'impose progressivement comme un vivier de talents pour la NBA et les championnats européens.",
    imageUrl: "https://source.unsplash.com/random/800x600/?basketball,africa",
    publishedAt: "2023-09-11T09:20:00Z",
  },
  {
    id: 4,
    title: "Le cyclisme urbain : nouvelle tendance sportive",
    slug: "cyclisme-urbain-nouvelle-tendance",
    category: "Sport",
    excerpt: "Les compétitions de cyclisme urbain gagnent en popularité dans les grandes métropoles, alliant sport et mobilité durable.",
    imageUrl: "https://source.unsplash.com/random/800x600/?cycling,urban",
    publishedAt: "2023-09-08T14:10:00Z",
  },
  {
    id: 5,
    title: "Portrait : l'ascension fulgurante de notre champion national",
    slug: "portrait-ascension-champion-national",
    category: "Sport",
    excerpt: "De ses débuts modestes à la reconnaissance internationale, parcours d'un athlète d'exception qui inspire toute une génération.",
    imageUrl: "https://source.unsplash.com/random/800x600/?champion,athlete",
    publishedAt: "2023-09-05T10:15:00Z",
  },
  {
    id: 6,
    title: "Le rugby se développe dans les écoles",
    slug: "rugby-developpement-ecoles",
    category: "Sport",
    excerpt: "Initiative nationale pour promouvoir les valeurs du rugby auprès des jeunes à travers un programme éducatif ambitieux.",
    imageUrl: "https://source.unsplash.com/random/800x600/?rugby,school",
    publishedAt: "2023-09-02T16:40:00Z",
  },
];

// Fonction pour formater les dates
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export default function SportPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Bannière de la catégorie */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://source.unsplash.com/random/1920x1080/?sports,stadium" 
            alt="Sport" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-green-800/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sport</h1>
            <p className="text-xl text-white/80">
              Toute l'actualité sportive, les compétitions, les portraits de champions et les analyses.
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
          {sportArticles.map(article => (
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
                  <span className="bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
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
                <Link href={`/article/${article.slug}`} className="text-green-600 hover:underline text-sm inline-flex items-center">
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