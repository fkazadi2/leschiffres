import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getRecentArticles } from '@/lib/supabase';
import AdWrapper from '@/components/ads/AdWrapper';
import CommentSection from '@/components/comments/CommentSection';
import RelatedArticles from '@/components/related/RelatedArticles';
import ShareButtons from '@/components/share/ShareButtons';
import AuthorCard from '@/components/article/AuthorCard';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Import dynamique du composant client (côté navigateur uniquement)
const ArticleClient = dynamic(() => import('./page.client'), { ssr: false });

// Fonction pour générer les métadonnées dynamiques
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article non trouvé | Les Chiffres',
      description: 'Cet article n\'existe pas ou a été supprimé.'
    };
  }
  
  return {
    title: `${article.title} | Les Chiffres`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.imageUrl, width: 1200, height: 630, alt: article.title }],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    }
  };
}

// Composant pour afficher le contenu de l'article formaté
function ArticleContent({ content }: { content: string }) {
  // Fonction simplifiée pour convertir le contenu texte en HTML basique
  // Dans une implémentation réelle, vous utiliseriez un parser markdown ou un éditeur riche
  const formattedContent = content
    .split('\n\n')
    .map((paragraph, index) => {
      // Si le paragraphe commence par # ou ## etc, le traiter comme un titre
      if (paragraph.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-[var(--text-color)]">{paragraph.substring(2)}</h2>;
      }
      if (paragraph.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-[var(--text-color)]">{paragraph.substring(3)}</h3>;
      }
      if (paragraph.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-bold mt-5 mb-2 text-[var(--text-color)]">{paragraph.substring(4)}</h4>;
      }
      
      // Traitement basique pour les liens et le texte en gras
      let formattedParagraph = paragraph;
      
      // Remplacer les liens markdown par des liens HTML
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      formattedParagraph = formattedParagraph.replace(linkRegex, '<a href="$2" class="text-[var(--primary)] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
      
      // Remplacer le texte en gras
      const boldRegex = /\*\*([^*]+)\*\*/g;
      formattedParagraph = formattedParagraph.replace(boldRegex, '<strong>$1</strong>');
      
      // Remplacer le texte en italique
      const italicRegex = /\*([^*]+)\*/g;
      formattedParagraph = formattedParagraph.replace(italicRegex, '<em>$1</em>');
      
      return (
        <p 
          key={index} 
          className="mb-4 text-[var(--text-color)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedParagraph }}
        />
      );
    });

  return <div className="article-content">{formattedContent}</div>;
}

// Page principale de l'article
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }
  
  // Récupérer quelques articles récents pour les suggestions
  const recentArticles = await getRecentArticles(6); // On demande plus pour avoir de la marge après filtrage
  
  // Formater la date de publication
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Composant client pour incrémenter les vues */}
      <ArticleClient articleId={article.id} />
      
      <div className="max-w-4xl mx-auto">
        {/* Fil d'Ariane */}
        <div className="text-sm mb-6 text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${article.category.toLowerCase()}`} className="hover:text-[var(--primary)] transition-colors">
            {article.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text-color)]">{article.title}</span>
        </div>
        
        {/* En-tête de l'article */}
        <header className="mb-8 fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4">
            {article.title}
          </h1>
          
          <p className="text-lg text-[var(--text-muted)] mb-6">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image 
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-[var(--text-color)]">
                  {article.author.name}
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  Publié le {formatDate(article.publishedAt)}
                </div>
              </div>
            </div>
            
            <div>
              <span className="bg-[var(--primary)] text-white px-3 py-1 rounded-full text-sm">
                {article.category}
              </span>
            </div>
          </div>
          
          {/* Image principale */}
          <div className="rounded-2xl overflow-hidden relative h-96 mb-8">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </header>
        
        {/* Bannière publicitaire supérieure */}
        <AdWrapper
          format="leaderboard"
          className="my-6"
        />
        
        {/* Contenu de l'article */}
        <article className="prose prose-lg max-w-none mb-8">
          <ArticleContent content={article.content} />
        </article>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="my-8">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Link 
                  key={index}
                  href={`/tags/${tag.toLowerCase()}`}
                  className="bg-[var(--bg-alt)] text-[var(--text-muted)] hover:bg-[var(--primary-light)] hover:text-[var(--primary-dark)] px-3 py-1 rounded-full text-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Bannière publicitaire inférieure */}
        <AdWrapper
          format="leaderboard"
          className="my-8"
        />
        
        {/* Boutons de partage */}
        <ShareButtons 
          url={`/article/${article.slug}`}
          title={article.title}
          description={article.excerpt}
        />
        
        {/* Carte de l'auteur */}
        <div className="my-12">
          <AuthorCard author={article.author} />
        </div>
        
        {/* Articles connexes */}
        <RelatedArticles 
          articles={recentArticles || []} 
          currentArticleId={article.id}
        />
        
        {/* Bannière publicitaire avant les commentaires */}
        <AdWrapper
          format="rectangle"
          className="my-8"
        />
        
        {/* Section commentaires */}
        <CommentSection 
          articleId={article.id}
          articleSlug={article.slug}
        />
      </div>
    </main>
  );
} 