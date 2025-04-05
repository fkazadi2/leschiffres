'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { incrementArticleViews } from '@/lib/supabase';

interface ArticleClientProps {
  articleId: string;
}

export default function ArticleClient({ articleId }: ArticleClientProps) {
  // Utiliser IntersectionObserver pour détecter quand l'article est visible
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Incrémenter les vues lorsque l'article est visible
  useEffect(() => {
    if (inView) {
      const incrementViews = async () => {
        try {
          await incrementArticleViews(articleId);
        } catch (error) {
          console.error('Erreur lors de l\'incrémentation des vues:', error);
        }
      };

      incrementViews();
    }
  }, [inView, articleId]);

  return <div ref={ref} className="article-view-tracker" />;
} 