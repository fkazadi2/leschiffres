'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  publishedAt: string | null;
  updatedAt: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);

  const categoryMap: Record<string, string> = {
    '1': 'Économie',
    '2': 'Politique',
    '3': 'Social', 
    '4': 'Culture',
    '5': 'Sport',
    '6': 'Justice',
    '7': 'Technologie',
    '8': 'Environnement'
  };

  // Simulation des données d'articles pour la démo
  useEffect(() => {
    // Fonction pour charger les articles
    const loadArticles = async () => {
      setLoading(true);
      try {
        // Dans une vraie application, vous chargeriez les articles depuis Supabase
        // const { data, error } = await supabase
        //   .from('articles')
        //   .select('*')
        //   .order('created_at', { ascending: false });
        
        // if (error) throw error;
        
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées
        const mockArticles: Article[] = [
          {
            id: '1',
            title: 'Croissance économique en RDC : les perspectives pour 2023',
            slug: 'croissance-economique-rdc-perspectives-2023',
            category: '1', // Économie
            published: true,
            publishedAt: '2023-06-15T08:30:00Z',
            updatedAt: '2023-06-15T09:45:00Z'
          },
          {
            id: '2',
            title: 'Élections en RDC : les enjeux de la présidentielle',
            slug: 'elections-rdc-enjeux-presidentielle',
            category: '2', // Politique
            published: true,
            publishedAt: '2023-06-10T14:20:00Z',
            updatedAt: '2023-06-11T16:30:00Z'
          },
          {
            id: '3',
            title: 'Le secteur minier face aux défis environnementaux',
            slug: 'secteur-minier-defis-environnementaux',
            category: '8', // Environnement
            published: false,
            publishedAt: null,
            updatedAt: '2023-06-08T11:15:00Z'
          },
          {
            id: '4',
            title: 'L\'impact des réseaux sociaux sur la jeunesse congolaise',
            slug: 'impact-reseaux-sociaux-jeunesse-congolaise',
            category: '3', // Social
            published: true,
            publishedAt: '2023-06-05T09:00:00Z',
            updatedAt: '2023-06-06T10:20:00Z'
          },
          {
            id: '5',
            title: 'Les défis du système éducatif en RDC',
            slug: 'defis-systeme-educatif-rdc',
            category: '3', // Social
            published: true,
            publishedAt: '2023-06-01T13:45:00Z',
            updatedAt: '2023-06-02T15:10:00Z'
          },
          {
            id: '6',
            title: 'L\'évolution de la scène musicale congolaise',
            slug: 'evolution-scene-musicale-congolaise',
            category: '4', // Culture
            published: false,
            publishedAt: null,
            updatedAt: '2023-05-28T16:30:00Z'
          },
          {
            id: '7',
            title: 'Les innovations technologiques Made in Congo',
            slug: 'innovations-technologiques-made-in-congo',
            category: '7', // Technologie
            published: true,
            publishedAt: '2023-05-25T10:00:00Z',
            updatedAt: '2023-05-26T11:45:00Z'
          }
        ];
        
        setArticles(mockArticles);
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  // Filtrer les articles en fonction du statut et de la recherche
  const filteredArticles = articles.filter(article => {
    // Filtrer par statut
    if (filterStatus === 'published' && !article.published) return false;
    if (filterStatus === 'draft' && article.published) return false;
    
    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        categoryMap[article.category]?.toLowerCase().includes(query) ||
        article.slug.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Fonction pour formater une date
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

  // Gérer la sélection/désélection de tous les articles
  const toggleSelectAll = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(filteredArticles.map(article => article.id));
    }
  };

  // Gérer la sélection/désélection d'un article
  const toggleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter(articleId => articleId !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  // Simuler la suppression d'articles
  const handleDelete = async () => {
    if (!selectedArticles.length || !confirm('Êtes-vous sûr de vouloir supprimer ces articles ?')) {
      return;
    }
    
    try {
      // Dans une vraie application, vous supprimeriez les articles dans Supabase
      // const { error } = await supabase
      //   .from('articles')
      //   .delete()
      //   .in('id', selectedArticles);
      
      // if (error) throw error;
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mettre à jour l'état local
      setArticles(articles.filter(article => !selectedArticles.includes(article.id)));
      setSelectedArticles([]);
    } catch (error) {
      console.error('Erreur lors de la suppression des articles:', error);
      alert('Une erreur est survenue lors de la suppression des articles.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-color)]">Articles</h2>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            href="/admin/articles/new"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
          >
            Nouvel article
          </Link>
        </div>
      </div>
      
      <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[var(--border-color)] flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-[var(--text-muted)]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            >
              <option value="all">Tous les articles</option>
              <option value="published">Publiés</option>
              <option value="draft">Brouillons</option>
            </select>
            
            {selectedArticles.length > 0 && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Supprimer
              </button>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="py-32 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <svg
              className="h-16 w-16 text-[var(--text-muted)]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="mt-4 text-[var(--text-muted)]">Aucun article trouvé</p>
            <Link
              href="/admin/articles/new"
              className="mt-4 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
            >
              Créer un article
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[var(--bg-alt)] border-b border-[var(--border-color)]">
                  <th className="py-3 px-4 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-[var(--border-color)] text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left">Titre</th>
                  <th className="py-3 px-4 text-left">Catégorie</th>
                  <th className="py-3 px-4 text-left">Statut</th>
                  <th className="py-3 px-4 text-left">Date de publication</th>
                  <th className="py-3 px-4 text-left">Dernière modification</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-hover)]">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedArticles.includes(article.id)}
                          onChange={() => toggleSelectArticle(article.id)}
                          className="rounded border-[var(--border-color)] text-[var(--primary)] focus:ring-[var(--primary)]"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/admin/articles/edit/${article.id}`} className="font-medium hover:text-[var(--primary)] transition-colors">
                        {article.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--bg-alt)]">
                        {categoryMap[article.category] || 'Non catégorisé'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {article.published ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Publié
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
                          Brouillon
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">
                      {formatDate(article.publishedAt)}
                    </td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">
                      {formatDate(article.updatedAt)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <Link
                          href={`/admin/articles/edit/${article.id}`}
                          className="p-1 rounded-md hover:bg-[var(--bg-alt)] text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors"
                          title="Modifier"
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="p-1 rounded-md hover:bg-[var(--bg-alt)] text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors"
                          title="Voir"
                        >
                          <svg
                            className="h-5 w-5"
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
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedArticles([article.id]);
                            handleDelete();
                          }}
                          className="p-1 rounded-md hover:bg-[var(--bg-alt)] text-[var(--text-muted)] hover:text-red-600 transition-colors"
                          title="Supprimer"
                        >
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 