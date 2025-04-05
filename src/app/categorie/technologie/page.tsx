import Image from 'next/image';
import Link from 'next/link';
import AdWrapper from '@/components/ads/AdWrapper';

const articles = [
  {
    id: 1,
    title: "L'intelligence artificielle révolutionne la santé",
    slug: "ia-revolution-sante",
    category: "Technologie",
    excerpt: "Comment les algorithmes d'IA transforment le diagnostic médical et la recherche pharmaceutique pour des traitements plus efficaces.",
    imageUrl: "https://source.unsplash.com/random/800x600/?ai,health",
    publishedAt: "2023-09-15T08:30:00Z",
  },
  {
    id: 2,
    title: "La blockchain au service de la transparence administrative",
    slug: "blockchain-transparence-administrative",
    category: "Technologie",
    excerpt: "Applications concrètes de la technologie blockchain dans la gestion des documents publics et la lutte contre la corruption.",
    imageUrl: "https://source.unsplash.com/random/800x600/?blockchain,technology",
    publishedAt: "2023-09-12T10:15:00Z",
  },
  {
    id: 3,
    title: "Les fintech, nouveau moteur de l'inclusion financière",
    slug: "fintech-inclusion-financiere",
    category: "Technologie",
    excerpt: "Comment les startups financières innovantes facilitent l'accès aux services bancaires pour tous, notamment dans les zones rurales.",
    imageUrl: "https://source.unsplash.com/random/800x600/?fintech,mobile",
    publishedAt: "2023-09-10T09:45:00Z",
  }
];

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export default function TechnologiePage() {
  return (
    <div className="min-h-screen py-12">
      <section className="relative bg-gradient-to-r from-teal-500 to-emerald-600 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://source.unsplash.com/random/1920x1080/?technology,digital" alt="Technologie" fill className="object-cover" priority/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/80 to-emerald-600/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Technologie</h1>
            <p className="text-xl text-white/80">Les dernières innovations, tendances et analyses du monde technologique.</p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <AdWrapper position="header" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {articles.map(article => (
            <article key={article.id} className="bg-[var(--card-bg)] rounded-3xl overflow-hidden card-3d fade-in shadow-lg">
              <div className="relative aspect-video">
                <Image src={article.imageUrl} alt={article.title} fill className="object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">{article.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-[var(--text-muted)] text-sm">{formatDate(article.publishedAt)}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-color)] mb-3">{article.title}</h3>
                <p className="text-[var(--text-muted)] line-clamp-3 mb-4">{article.excerpt}</p>
                <Link href={`/article/${article.slug}`} className="text-teal-500 hover:underline text-sm inline-flex items-center">
                  Lire l'article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="my-16">
          <AdWrapper position="footer" />
        </div>
      </div>
    </div>
  );
} 