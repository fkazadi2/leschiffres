'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

// Types pour les commentaires
interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

interface CommentSectionProps {
  articleId: string;
  articleSlug: string;
}

export default function CommentSection({ articleId, articleSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [rememberInfo, setRememberInfo] = useState(false);
  const { theme } = useTheme();

  // Simuler le chargement des commentaires
  useEffect(() => {
    const loadComments = async () => {
      try {
        // Dans une vraie application, vous chargeriez les commentaires depuis votre API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Commentaires simulés pour la démonstration
        const sampleComments: Comment[] = [
          {
            id: '1',
            author: {
              name: 'Jean Dupont',
              avatar: `https://ui-avatars.com/api/?name=Jean+Dupont&background=random&color=fff`,
            },
            content: "Excellent article qui met en lumière des aspects souvent négligés de l'économie congolaise. J'apprécie particulièrement l'analyse des perspectives d'investissement dans le secteur minier.",
            date: '2023-06-18T09:24:00Z',
            likes: 12,
            dislikes: 2,
            replies: [
              {
                id: '1-1',
                author: {
                  name: 'Marie Kabongo',
                  avatar: `https://ui-avatars.com/api/?name=Marie+Kabongo&background=random&color=fff`,
                },
                content: "Je suis d'accord avec vous, Jean. L'article offre une perspective équilibrée sur un sujet complexe.",
                date: '2023-06-18T10:15:00Z',
                likes: 5,
                dislikes: 0,
              }
            ]
          },
          {
            id: '2',
            author: {
              name: 'Pierre Musoko',
              avatar: `https://ui-avatars.com/api/?name=Pierre+Musoko&background=random&color=fff`,
            },
            content: "Je trouve que certains points auraient mérité d'être plus développés, notamment concernant l'impact environnemental des exploitations minières artisanales.",
            date: '2023-06-17T14:32:00Z',
            likes: 8,
            dislikes: 3,
          }
        ];
        
        setComments(sampleComments);
      } catch (error) {
        console.error('Erreur lors du chargement des commentaires:', error);
        setError('Impossible de charger les commentaires. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadComments();
    
    // Récupérer les informations utilisateur du localStorage si disponibles
    const savedUserInfo = localStorage.getItem('commentUserInfo');
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
      setRememberInfo(true);
    }
  }, []);

  // Formater une date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Gérer la soumission d'un nouveau commentaire
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim() || !userInfo.name.trim() || !userInfo.email.trim()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Sauvegarder les informations utilisateur si demandé
    if (rememberInfo) {
      localStorage.setItem('commentUserInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('commentUserInfo');
    }
    
    // Dans une vraie application, vous enverriez le commentaire à votre API
    const newCommentObj: Comment = {
      id: `new-${Date.now()}`,
      author: {
        name: userInfo.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=random&color=fff`,
      },
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  // Gérer la soumission d'une réponse
  const handleSubmitReply = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    
    if (!replyContent.trim() || !userInfo.name.trim() || !userInfo.email.trim()) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Sauvegarder les informations utilisateur si demandé
    if (rememberInfo) {
      localStorage.setItem('commentUserInfo', JSON.stringify(userInfo));
    }
    
    // Créer la nouvelle réponse
    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      author: {
        name: userInfo.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=random&color=fff`,
      },
      content: replyContent,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };
    
    // Mettre à jour les commentaires avec la nouvelle réponse
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyTo(null);
    setReplyContent('');
  };

  // Gérer les votes (like/dislike)
  const handleVote = (commentId: string, parentId: string | null, voteType: 'like' | 'dislike') => {
    const updatedComments = comments.map(comment => {
      if (parentId === null) {
        // C'est un commentaire principal
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: voteType === 'like' ? comment.likes + 1 : comment.likes,
            dislikes: voteType === 'dislike' ? comment.dislikes + 1 : comment.dislikes
          };
        }
      } else if (comment.id === parentId && comment.replies) {
        // C'est une réponse
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === commentId) {
            return {
              ...reply,
              likes: voteType === 'like' ? reply.likes + 1 : reply.likes,
              dislikes: voteType === 'dislike' ? reply.dislikes + 1 : reply.dislikes
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  return (
    <div className="my-12 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border-color)] flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <h3 className="text-xl font-bold text-[var(--text-color)]">Commentaires ({comments.length})</h3>
      </div>
      
      {/* Formulaire pour ajouter un commentaire */}
      <div className="p-6 border-b border-[var(--border-color)]">
        <form onSubmit={handleSubmitComment}>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-[var(--text-color)] mb-2">
              Votre commentaire
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
              placeholder="Partagez votre opinion sur cet article..."
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-color)] mb-2">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                placeholder="Votre nom"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-color)] mb-2">
                Email <span className="text-red-500">*</span> <span className="text-[var(--text-muted)] text-xs">(ne sera pas publié)</span>
              </label>
              <input
                type="email"
                id="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember"
              checked={rememberInfo}
              onChange={(e) => setRememberInfo(e.target.checked)}
              className="rounded border-[var(--border-color)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-[var(--text-muted)]">
              Enregistrer mon nom et mon email pour mes prochains commentaires
            </label>
          </div>
          
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
          >
            Publier mon commentaire
          </button>
        </form>
      </div>
      
      {/* Liste des commentaires */}
      <div className="divide-y divide-[var(--border-color)]">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
            <p className="mt-2 text-[var(--text-muted)]">Chargement des commentaires...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            {error}
          </div>
        ) : comments.length === 0 ? (
          <div className="p-6 text-center text-[var(--text-muted)]">
            Aucun commentaire pour le moment. Soyez le premier à réagir !
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[var(--text-color)]">
                      {comment.author.name}
                    </h4>
                    <span className="text-sm text-[var(--text-muted)]">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                  
                  <div className="mt-2 text-[var(--text-color)]">
                    {comment.content}
                  </div>
                  
                  <div className="mt-3 flex items-center">
                    <button
                      onClick={() => handleVote(comment.id, null, 'like')}
                      className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>{comment.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => handleVote(comment.id, null, 'dislike')}
                      className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors ml-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                      </svg>
                      <span>{comment.dislikes}</span>
                    </button>
                    
                    <button
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors ml-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      <span>Répondre</span>
                    </button>
                  </div>
                  
                  {/* Formulaire de réponse */}
                  {replyTo === comment.id && (
                    <div className="mt-4 pl-4 border-l-2 border-[var(--border-color)]">
                      <form onSubmit={(e) => handleSubmitReply(e, comment.id)}>
                        <div className="mb-3">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                            placeholder="Votre réponse..."
                            rows={3}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                            className="px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                            placeholder="Votre nom"
                            required
                          />
                          
                          <input
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                            className="px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                            placeholder="Votre email (non publié)"
                            required
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            type="submit"
                            className="px-3 py-1 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors text-sm"
                          >
                            Répondre
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setReplyTo(null)}
                            className="px-3 py-1 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-alt)] transition-colors text-sm"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                  
                  {/* Réponses au commentaire */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-[var(--border-color)] space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="pt-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3">
                              <div className="w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                  src={reply.author.avatar}
                                  alt={reply.author.name}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <h5 className="font-bold text-[var(--text-color)] text-sm">
                                  {reply.author.name}
                                </h5>
                                <span className="text-xs text-[var(--text-muted)]">
                                  {formatDate(reply.date)}
                                </span>
                              </div>
                              
                              <div className="mt-1 text-[var(--text-color)] text-sm">
                                {reply.content}
                              </div>
                              
                              <div className="mt-2 flex items-center">
                                <button
                                  onClick={() => handleVote(reply.id, comment.id, 'like')}
                                  className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors text-xs"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                  </svg>
                                  <span>{reply.likes}</span>
                                </button>
                                
                                <button
                                  onClick={() => handleVote(reply.id, comment.id, 'dislike')}
                                  className="inline-flex items-center text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors ml-3 text-xs"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                  </svg>
                                  <span>{reply.dislikes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 