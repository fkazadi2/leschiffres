'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Import dynamique pour éviter les erreurs SSR
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Chargement de l'éditeur...</div>
});

export default function NewArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [article, setArticle] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    imageUrl: '',
    tags: ''
  });
  const [categories, setCategories] = useState([
    { id: '1', name: 'Économie' },
    { id: '2', name: 'Politique' },
    { id: '3', name: 'Social' },
    { id: '4', name: 'Culture' },
    { id: '5', name: 'Sport' },
    { id: '6', name: 'Justice' },
    { id: '7', name: 'Technologie' },
    { id: '8', name: 'Environnement' }
  ]);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Générer automatiquement le slug à partir du titre
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
        .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
        .replace(/--+/g, '-') // Remplacer les tirets multiples par un seul
        .trim();
      
      setArticle(prev => ({
        ...prev,
        slug
      }));
    }
  };

  // Fonction pour gérer les changements dans l'éditeur de contenu
  const handleContentChange = (content: string) => {
    setArticle(prev => ({ ...prev, content }));
  };

  // Fonction pour gérer le téléchargement de l'image principale
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    try {
      // Simuler le téléchargement d'une image (dans une vraie app, ce serait vers Supabase Storage)
      // await supabase.storage.from('images').upload(fileName, file);
      // const { data } = await supabase.storage.from('images').getPublicUrl(fileName);
      
      // Utiliser une URL de placeholder pour la simulation
      const imageUrl = `https://via.placeholder.com/1200x600?text=${encodeURIComponent(file.name)}`;
      
      setArticle(prev => ({
        ...prev,
        imageUrl
      }));
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error);
      setError('Une erreur est survenue lors du téléchargement de l\'image. Veuillez réessayer.');
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Valider les champs obligatoires
    if (!article.title || !article.excerpt || !article.content || !article.category) {
      setError('Veuillez remplir tous les champs obligatoires.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Dans une vraie application, vous enregistreriez l'article dans Supabase
      // const { data, error } = await supabase.from('articles').insert([
      //   {
      //     title: article.title,
      //     slug: article.slug,
      //     excerpt: article.excerpt,
      //     content: article.content,
      //     category: article.category,
      //     image_url: article.imageUrl,
      //     tags: article.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      //     published_at: new Date().toISOString(),
      //     author_id: 'USER_ID_HERE', // Dans une vraie app, ce serait l'ID de l'utilisateur connecté
      //   }
      // ]).select().single();
      
      // if (error) throw error;
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Rediriger vers la liste des articles
      router.push('/admin/articles');
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'article:', error);
      setError(error.message || 'Une erreur est survenue lors de la création de l\'article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour basculer entre l'édition et la prévisualisation
  const togglePreview = () => {
    setPreview(!preview);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-[var(--text-color)]">Nouvel article</h2>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            type="button"
            onClick={togglePreview}
            className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--bg-alt)] transition-colors"
          >
            {preview ? 'Éditer' : 'Prévisualiser'}
          </button>
          
          <Link
            href="/admin/articles"
            className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--bg-alt)] transition-colors"
          >
            Annuler
          </Link>
          
          <button
            type="submit"
            form="article-form"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      {preview ? (
        <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] shadow-sm">
          <h1 className="text-2xl font-bold text-[var(--text-color)] mb-4">{article.title || 'Titre de l\'article'}</h1>
          
          {article.imageUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-6">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <div className="mb-6 text-[var(--text-muted)]">
            {article.excerpt || 'Résumé de l\'article'}
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content || '<p>Le contenu de l\'article apparaîtra ici...</p>' }} />
          </div>
          
          {article.tags && (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="bg-[var(--bg-alt)] text-[var(--text-muted)] px-3 py-1 rounded-full text-sm"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      ) : (
        <form id="article-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] shadow-sm">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Titre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={article.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                      placeholder="Titre de l'article"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Slug <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={article.slug}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                      placeholder="titre-de-l-article"
                      required
                    />
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      L'URL de l'article sera : https://leschiffres.cd/article/{article.slug || 'titre-de-l-article'}
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Résumé <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      value={article.excerpt}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                      placeholder="Un court résumé de l'article (150-200 caractères)"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Contenu <span className="text-red-500">*</span>
                    </label>
                    <RichTextEditor
                      value={article.content}
                      onChange={handleContentChange}
                      placeholder="Commencez à rédiger votre article..."
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] shadow-sm mb-6">
                <h3 className="text-lg font-medium text-[var(--text-color)] mb-4">Paramètres de publication</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Catégorie <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={article.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="imageUpload" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Image principale
                    </label>
                    <div className="mt-1 flex items-center">
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] hover:bg-[var(--bg-alt)] transition cursor-pointer"
                      >
                        Choisir une image
                      </label>
                      {article.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setArticle(prev => ({ ...prev, imageUrl: '' }))}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                    {article.imageUrl && (
                      <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt="Aperçu"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Tags (séparés par des virgules)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={article.tags}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                      placeholder="économie, finance, croissance"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] shadow-sm">
                <h3 className="text-lg font-medium text-[var(--text-color)] mb-4">SEO</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="metaTitle" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Titre SEO
                    </label>
                    <input
                      type="text"
                      id="metaTitle"
                      name="metaTitle"
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                      placeholder="Titre pour les moteurs de recherche"
                    />
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Laissez vide pour utiliser le titre de l'article
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="metaDescription" className="block text-sm font-medium text-[var(--text-color)] mb-1">
                      Description SEO
                    </label>
                    <textarea
                      id="metaDescription"
                      name="metaDescription"
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                      placeholder="Description pour les moteurs de recherche"
                    />
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Laissez vide pour utiliser le résumé de l'article
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
} 