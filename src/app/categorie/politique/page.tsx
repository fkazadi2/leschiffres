import Image from 'next/image';
import Link from 'next/link';
import AdWrapper from '@/components/ads/AdWrapper';

// Données d'exemple pour les articles de politique
const politiqueArticles = [
  {
    id: 1,
    title: "Les enjeux de la réforme constitutionnelle",
    slug: "enjeux-reforme-constitutionnelle",
    category: "Politique",
    excerpt: "Analyse des points clés de la réforme constitutionnelle et de ses implications pour l'avenir des institutions démocratiques.",
    imageUrl: "https://source.unsplash.com/random/800x600/?politics,parliament",
    publishedAt: "2023-09-16T09:30:00Z",
  },
  {
    id: 2,
    title: "L'abstention électorale : un défi pour la démocratie",
    slug: "abstention-electorale-defi-democratie",
    category: "Politique",
    excerpt: "Les causes structurelles de la désaffection des citoyens pour les urnes et les pistes pour remobiliser l'électorat.",
    imageUrl: "https://source.unsplash.com/random/800x600/?vote,election",
    publishedAt: "2023-09-13T11:20:00Z",
  },
  {
    id: 3,
    title: "Politique étrangère : les nouveaux défis diplomatiques",
    slug: "politique-etrangere-defis-diplomatiques",
    category: "Politique",
    excerpt: "Dans un monde multipolaire, comment les États réinventent leurs stratégies d'influence et leurs alliances.",
    imageUrl: "https://source.unsplash.com/random/800x600/?diplomacy,international",
    publishedAt: "2023-09-10T10:15:00Z",
  },
  {
    id: 4,
    title: "Les mouvements populistes : analyse d'un phénomène global",
    slug: "mouvements-populistes-phenomene-global",
    category: "Politique",
    excerpt: "De l'Europe aux Amériques, décryptage de la montée des populismes et de leurs caractéristiques communes.",
    imageUrl: "https://source.unsplash.com/random/800x600/?protest,populism",
    publishedAt: "2023-09-07T14:40:00Z",
  },
  {
    id: 5,
    title: "Transparence politique : vers une éthique renforcée",
    slug: "transparence-politique-ethique-renforcee",
    category: "Politique",
    excerpt: "Les nouvelles exigences citoyennes en matière de probité des élus et les mécanismes mis en place pour y répondre.",
    imageUrl: "https://source.unsplash.com/random/800x600/?transparency,politics",
    publishedAt: "2023-09-04T08:50:00Z",
  },
  {
    id: 6,
    title: "Le numérique au service de la démocratie participative",
    slug: "numerique-democratie-participative",
    category: "Politique",
    excerpt: "Comment les outils numériques transforment le dialogue entre citoyens et élus, et ouvrent de nouveaux espaces de participation.",
    imageUrl: "https://source.unsplash.com/random/800x600/?digital,democracy",
    publishedAt: "2023-09-01T15:30:00Z",
  },
];

// Fonction pour formater les dates
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export default function PolitiquePage() {
  return (
    <div className="min-h-screen py-12">
      {/* Bannière de la catégorie */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://source.unsplash.com/random/1920x1080/?politics,government" 
            alt="Politique" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-purple-800/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Politique</h1>
            <p className="text-xl text-white/80">
              Actualités, analyses et décryptages des événements politiques nationaux et internationaux.
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
          {politiqueArticles.map(article => (
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
                  <span className="bg-purple-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
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
                <Link href={`/article/${article.slug}`} className="text-purple-600 hover:underline text-sm inline-flex items-center">
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