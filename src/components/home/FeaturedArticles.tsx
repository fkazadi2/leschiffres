'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Types pour les articles
interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
}

interface FeaturedArticlesProps {
  articles: Article[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  // État pour le carousel
  const [activeSlide, setActiveSlide] = useState(0);
  const featuredArticles = articles.slice(0, 4); // On prend les 4 premiers articles
  
  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Fonction pour passer au slide suivant
  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % featuredArticles.length);
  }, [featuredArticles.length]);

  // Fonction pour passer au slide précédent
  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? featuredArticles.length - 1 : prev - 1));
  }, [featuredArticles.length]);

  // Rotation automatique des slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Change de slide toutes les 6 secondes
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Articles secondaires (sans les 4 premiers)
  const secondaryArticles = articles.slice(1, 5);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-color)] relative">
            Featured
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[var(--primary)]"></span>
          </h2>
          
          <div className="flex space-x-2">
            <button 
              onClick={prevSlide}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Liste des catégories à gauche */}
          <div className="hidden lg:block col-span-2">
            <div className="bg-[var(--card-bg)] rounded-xl p-3 h-full">
              <h3 className="text-sm font-semibold mb-3 text-gray-400 px-2">CATÉGORIES</h3>
              <ul className="space-y-1">
                {['Économie', 'Politique', 'Social', 'Culture', 'Sport', 'Justice', 'Technologie', 'Environnement', 'Santé', 'Éducation', 'Médias', 'Histoire'].map((cat, index) => (
                  <li key={index}>
                    <Link 
                      href={`/categorie/${cat.toLowerCase()}`}
                      className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[rgba(var(--text-color-rgb),0.05)] transition-colors text-sm group"
                    >
                      <span className="text-[var(--text-muted)] group-hover:text-[var(--text-color)] transition-colors">{cat}</span>
                      {index < 3 && (
                        <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[var(--primary)]' : index === 1 ? 'bg-[var(--secondary)]' : 'bg-[var(--accent)]'}`}></span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Article principal - Carousel */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 relative overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out h-[600px]" 
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {featuredArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="min-w-full group relative h-full"
                >
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  </div>
                  
                  <div className="relative h-full flex flex-col justify-end p-6 z-10">
                    <div className="mb-4">
                      <span className="px-2 py-1 bg-[var(--primary)] text-white text-xs rounded-md">
                        {article.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 text-[var(--card-bg)]">
                      <Link href={`/article/${article.slug}`} className="hover:text-[var(--primary)] transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p className="text-[var(--card-bg)] opacity-90 mb-4 line-clamp-2">{article.excerpt}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--card-bg)] opacity-70 text-xs">{formatDate(article.publishedAt)}</span>
                      <Link
                        href={`/article/${article.slug}`}
                        className="text-[var(--primary)] hover:text-white font-medium text-sm flex items-center gap-1 group-hover:underline"
                      >
                        Lire plus
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicateurs de slide */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {featuredArticles.map((_, index) => (
                <button
                  key={`indicator-${index}`}
                  onClick={() => setActiveSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeSlide === index 
                      ? 'bg-[var(--primary)] w-6' 
                      : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                  }`}
                  aria-label={`Voir l'article ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Articles secondaires */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 h-full">
              {secondaryArticles.map((article) => (
                <div 
                  key={article.id}
                  className="group relative bg-[var(--card-bg)] rounded-xl overflow-hidden card-glow hover:scale-[1.01] transition-transform"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-1 bg-[rgba(0,0,0,0.5)] text-[var(--primary)] text-[10px] rounded">
                      {article.category}
                    </span>
                  </div>
                  
                  <div className="p-3">
                    <h3 className="text-sm font-bold mb-1 line-clamp-2">
                      <Link href={`/article/${article.slug}`} className="text-white hover:text-[var(--primary)] transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-500 text-[10px]">{formatDate(article.publishedAt)}</span>
                      <button className="w-6 h-6 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.05)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Section Featured Articles en bas */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[var(--text-color)] mb-8 relative">
            Featured Articles
            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[var(--primary)]"></span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {articles.map((article, index) => (
              <div 
                key={`bottom-${article.id}`}
                className="group relative bg-gradient-to-b from-[#2a2a3a] to-[#1a1a24] rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="absolute top-0 right-0">
                  <div className="bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-bl-lg">
                    NEW
                  </div>
                </div>
                
                <div className="p-3 pt-6">
                  <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <h3 className="text-[var(--text-color)] font-bold text-center mb-2">
                    {article.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  
                  <p className="text-[var(--text-muted)] text-xs text-center mb-3 line-clamp-1">
                    {article.title}
                  </p>
                  
                  <div className="flex justify-center">
                    <Link
                      href={`/article/${article.slug}`}
                      className="bg-[rgba(var(--text-color-rgb),0.05)] hover:bg-[rgba(var(--text-color-rgb),0.1)] text-xs text-[var(--text-color)] px-3 py-1 rounded-full transition-colors"
                    >
                      Découvrir
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 