'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLocalImageUrl } from '@/lib/imageUtils';

export default function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState('');

  // Générer des URLs d'images locales
  const backgroundImageUrl = getLocalImageUrl(1920, 1080, 'cyberpunk,futuristic,city');
  const portraitImageUrl = getLocalImageUrl(600, 800, 'cyberpunk,portrait,neon');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recherche pour:', searchQuery);
  };

  return (
    <section className="py-16 md:py-20 overflow-hidden relative">
      {/* Éléments décoratifs d'arrière-plan */}
      <div className="absolute w-96 h-96 rounded-full bg-[var(--primary)] filter blur-[100px] opacity-15 -top-20 -right-20 z-0"></div>
      <div className="absolute w-80 h-80 rounded-full bg-[var(--secondary)] filter blur-[100px] opacity-10 bottom-0 left-1/3 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        {/* Card Hero */}
        <div className="bg-[var(--card-bg)] rounded-3xl overflow-hidden card-glow relative cyberpunk-border">
          {/* Fond sombre avec overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("${backgroundImageUrl}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,15,20,0.7)] to-[rgba(26,26,36,0.9)]"></div>
          </div>
          
          {/* Contenu */}
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Colonne de gauche */}
              <div className="w-full md:w-6/12 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-6xl font-bold">
                    <span className="text-white">Le</span>
                    <span className="text-[var(--primary)] neon-text">Shiiffes</span>
                    <span className="text-[var(--primary)]">.</span>
                  </h1>
                  <p className="text-xl text-gray-300 tracking-wider">
                    Your side of your chinoiserie
                  </p>
                </div>
                
                <p className="text-gray-400 md:text-lg max-w-lg">
                  Explorez nos analyses, tableaux de bord et visualisations pour donner du sens aux chiffres qui façonnent notre monde.
                </p>
                
                {/* Boutons CTA */}
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/dashboard" 
                    className="px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
                  >
                    <span>Voir les données</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <button className="px-6 py-3 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[rgba(255,56,146,0.1)] transition-colors font-medium">
                    Explorer
                  </button>
                </div>
                
                {/* Catégories populaires */}
                <div className="pt-4">
                  <p className="text-sm text-gray-400 mb-3">Catégories populaires:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Trends', 'Reports', 'Social', 'Culture', 'Sports'].map((cat) => (
                      <Link 
                        key={cat}
                        href={`/categorie/${cat.toLowerCase()}`}
                        className="bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded-full text-sm transition-colors border border-[rgba(255,255,255,0.1)]"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Colonne de droite - Image/Device */}
              <div className="w-full md:w-6/12 relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] z-10 rounded-xl"></div>
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url("${portraitImageUrl}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Barre du haut style UI futuriste */}
                <div className="absolute top-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] p-3 flex justify-between items-center z-20">
                  <div className="flex gap-2 items-center">
                    <span className="h-3 w-3 rounded-full bg-[var(--primary)] pulse-animate"></span>
                    <span className="h-3 w-3 rounded-full bg-[var(--accent)]"></span>
                    <span className="text-xs text-gray-400 ml-2">ID:97-204</span>
                  </div>
                  <div className="text-xs text-gray-300">SIGNAL:STATUS//ACTIVE</div>
                </div>
                
                {/* Overlay UI Elements pour effet futuriste */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400 bg-[rgba(0,0,0,0.5)] px-2 py-1 rounded">ACCESS LEVEL 3</div>
                      <div className="text-xs text-gray-400">ENTR PWR 89%</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white">Rapport d'analyse</h3>
                    <p className="text-sm text-gray-300">Tendances économiques 2023-Q4</p>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-3">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.1)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.1)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.1)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                      <button className="px-3 py-1 bg-[var(--primary)] text-white text-xs rounded">LIRE</button>
                    </div>
                  </div>
                </div>
                
                {/* Lignes grille décorative */}
                <div className="absolute inset-0 z-10 grid grid-cols-6 grid-rows-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`vline-${i}`} className="absolute top-0 bottom-0 border-l border-[rgba(255,255,255,0.03)]" style={{ left: `${((i + 1) * 100) / 6}%` }}></div>
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`hline-${i}`} className="absolute left-0 right-0 border-t border-[rgba(255,255,255,0.03)]" style={{ top: `${((i + 1) * 100) / 6}%` }}></div>
                  ))}
                </div>
                
                {/* Élément de coin futuriste */}
                <div className="absolute top-4 right-4 w-20 h-20 z-20">
                  <div className="absolute left-0 top-0 w-4 h-px bg-[var(--primary)]"></div>
                  <div className="absolute left-0 top-0 w-px h-4 bg-[var(--primary)]"></div>
                  <div className="absolute right-0 top-0 w-4 h-px bg-[var(--primary)]"></div>
                  <div className="absolute right-0 top-0 w-px h-4 bg-[var(--primary)]"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-20 h-20 z-20">
                  <div className="absolute left-0 bottom-0 w-4 h-px bg-[var(--primary)]"></div>
                  <div className="absolute left-0 bottom-0 w-px h-4 bg-[var(--primary)]"></div>
                  <div className="absolute right-0 bottom-0 w-4 h-px bg-[var(--primary)]"></div>
                  <div className="absolute right-0 bottom-0 w-px h-4 bg-[var(--primary)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 