'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    categories: 0,
    users: 0,
    views: 0
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [popularArticles, setPopularArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les données simulées
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Dans une vraie application, ces données proviendraient de Supabase
        // const { data: articlesData, error: articlesError } = await supabase
        //   .from('articles')
        //   .select('*');
        
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées
        setStats({
          totalArticles: 74,
          publishedArticles: 62,
          draftArticles: 12,
          categories: 8,
          users: 5,
          views: 45920
        });
        
        setRecentArticles([
          {
            id: '1',
            title: 'Croissance économique en RDC : les perspectives pour 2023',
            slug: 'croissance-economique-rdc-perspectives-2023',
            status: 'published',
            publishedAt: '2023-06-15T08:30:00Z',
            author: 'Jean Mupenda'
          },
          {
            id: '2',
            title: 'Élections en RDC : les enjeux de la présidentielle',
            slug: 'elections-rdc-enjeux-presidentielle',
            status: 'published',
            publishedAt: '2023-06-10T14:20:00Z',
            author: 'Marie Kasongo'
          },
          {
            id: '3',
            title: 'Le secteur minier face aux défis environnementaux',
            slug: 'secteur-minier-defis-environnementaux',
            status: 'draft',
            publishedAt: null,
            author: 'Paul Kabongo'
          },
          {
            id: '4',
            title: 'L\'impact des réseaux sociaux sur la jeunesse congolaise',
            slug: 'impact-reseaux-sociaux-jeunesse-congolaise',
            status: 'published',
            publishedAt: '2023-06-05T09:00:00Z',
            author: 'Sophie Mutombo'
          }
        ]);
        
        setPopularArticles([
          {
            id: '5',
            title: 'Les défis du système éducatif en RDC',
            slug: 'defis-systeme-educatif-rdc',
            views: 3405,
            category: 'Social'
          },
          {
            id: '6',
            title: 'L\'évolution de la scène musicale congolaise',
            slug: 'evolution-scene-musicale-congolaise',
            views: 2871,
            category: 'Culture'
          },
          {
            id: '7',
            title: 'Les innovations technologiques Made in Congo',
            slug: 'innovations-technologiques-made-in-congo',
            views: 2345,
            category: 'Technologie'
          },
          {
            id: '8',
            title: 'La RDC face aux changements climatiques',
            slug: 'rdc-face-changements-climatiques',
            views: 1982,
            category: 'Environnement'
          }
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Formater un nombre avec séparateurs de milliers
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  // Formater une date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non publié';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-color)]">Tableau de bord</h2>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            href="/admin/articles/new"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
          >
            Nouvel article
          </Link>
        </div>
      </div>
      
      {loading ? (
        <div className="py-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
        </div>
      ) : (
        <>
          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <div className="text-[var(--text-muted)] text-sm">Articles</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-semibold text-[var(--text-color)]">
                      {formatNumber(stats.totalArticles)}
                    </span>
                    <span className="ml-2 text-sm text-[var(--text-muted)]">
                      ({formatNumber(stats.publishedArticles)} publiés, {formatNumber(stats.draftArticles)} brouillons)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <div className="text-[var(--text-muted)] text-sm">Vues totales</div>
                  <div className="mt-1">
                    <span className="text-2xl font-semibold text-[var(--text-color)]">
                      {formatNumber(stats.views)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <svg
                    className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
                <div className="ml-5">
                  <div className="text-[var(--text-muted)] text-sm">Catégories</div>
                  <div className="mt-1">
                    <span className="text-2xl font-semibold text-[var(--text-color)]">
                      {formatNumber(stats.categories)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Articles */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border-color)]">
              <h3 className="text-lg font-medium text-[var(--text-color)]">Articles récents</h3>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {recentArticles.map((article) => (
                <div key={article.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/admin/articles/edit/${article.id}`}
                        className="text-[var(--text-color)] font-medium hover:text-[var(--primary)] transition-colors"
                      >
                        {article.title}
                      </Link>
                      <div className="mt-1 flex items-center text-sm text-[var(--text-muted)]">
                        <span>Par {article.author}</span>
                        <span className="mx-1">•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {article.status === 'published' ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Publié
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                          Brouillon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-3 px-6 border-t border-[var(--border-color)] bg-[var(--bg-alt)]">
              <Link
                href="/admin/articles"
                className="text-[var(--primary)] hover:underline"
              >
                Voir tous les articles →
              </Link>
            </div>
          </div>
          
          {/* Popular Articles */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border-color)]">
              <h3 className="text-lg font-medium text-[var(--text-color)]">Articles populaires</h3>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {popularArticles.map((article) => (
                <div key={article.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/admin/articles/edit/${article.id}`}
                        className="text-[var(--text-color)] font-medium hover:text-[var(--primary)] transition-colors"
                      >
                        {article.title}
                      </Link>
                      <div className="mt-1 flex items-center text-sm text-[var(--text-muted)]">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--bg-alt)]">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center">
                      <svg
                        className="h-5 w-5 text-[var(--text-muted)]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="ml-1 text-[var(--text-muted)]">
                        {formatNumber(article.views)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 