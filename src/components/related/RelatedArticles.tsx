'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Type pour un article connexe
interface RelatedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  currentArticleId: string;
}

export default function RelatedArticles({ articles, currentArticleId }: RelatedArticlesProps) {
  // Filtrer les articles pour exclure l'article actuel
  const filteredArticles = articles.filter(article => article.id !== currentArticleId);
  
  // Limiter à 3 articles maximum
  const displayedArticles = filteredArticles.slice(0, 3);
  
  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-[var(--text-color)] mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Articles connexes
      </h3>
      
      {displayedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedArticles.map((article) => (
            <Link 
              href={`/article/${article.slug}`} 
              key={article.id}
              className="group"
            >
              <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--border-color)] hover:shadow-md transition-all duration-300 h-full flex flex-col card-3d">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[var(--primary)] text-white text-xs px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <h4 className="font-bold text-[var(--text-color)] text-lg mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                    {article.title}
                  </h4>
                  
                  <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-xs text-[var(--text-muted)]">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                        <Image 
                          src={article.author.avatar} 
                          alt={article.author.name}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                      <span>{article.author.name}</span>
                    </div>
                    <span className="mx-2">•</span>
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-[var(--text-muted)] bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)]">
          Aucun article connexe disponible pour le moment.
        </div>
      )}
    </div>
  );
} 