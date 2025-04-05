'use client';

import { useState, useEffect } from 'react';

type AdSize = 'leaderboard' | 'rectangle' | 'skyscraper' | 'mobile';

interface AdBannerProps {
  size: AdSize;
  className?: string;
  id?: string;
}

const sizeDimensions = {
  leaderboard: { width: '970px', height: '120px' },
  rectangle: { width: '400px', height: '300px' },
  skyscraper: { width: '240px', height: '800px' },
  mobile: { width: '360px', height: '140px' },
};

const colors = [
  'from-blue-400 to-violet-500', 
  'from-emerald-400 to-cyan-500', 
  'from-rose-400 to-orange-500',
  'from-amber-400 to-yellow-500',
];

export default function AdBanner({ size, className = '', id }: AdBannerProps) {
  const [color, setColor] = useState(colors[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simuler un délai de chargement pour la publicité
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Choisir une couleur aléatoire pour la démo
      setColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const { width, height } = sizeDimensions[size];
  
  return (
    <div
      id={id}
      className={`relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-lg ${className}`}
      style={{ width, height }}
    >
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent"></div>
        </div>
      ) : (
        <div className={`h-full w-full bg-gradient-to-r ${color} p-4 flex flex-col items-center justify-center overflow-hidden`}>
          <div className="bg-[var(--card-bg)] bg-opacity-80 rounded-2xl px-5 py-2.5 mb-3 shadow-sm">
            <p className="text-xs font-medium text-[var(--text-muted)]">Publicité</p>
          </div>
          <p className="text-white text-lg md:text-xl font-medium text-center">
            Votre annonce ici
          </p>
          <p className="text-white/70 text-sm mt-1 text-center">
            Contactez-nous pour réserver cet espace
          </p>
        </div>
      )}
    </div>
  );
} 