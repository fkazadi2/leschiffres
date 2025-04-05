'use client';

import { useState, useEffect, useMemo } from 'react';
import PlaceholderImage from '../ui/PlaceholderImage';

export interface AdWrapperProps {
  format?: 'leaderboard' | 'rectangle' | 'skyscraper' | 'mobile';
  position?: 'header' | 'footer' | 'sidebar' | 'content';
  className?: string;
  id?: string;
}

interface AdSize {
  width: number;
  height: number;
}

export default function AdWrapper({ format, position, className = '', id }: AdWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Déterminer les dimensions en fonction du format ou de la position
  const adSize: AdSize = useMemo(() => {
    // Priorité au format s'il est spécifié
    if (format) {
      switch (format) {
        case 'leaderboard':
          return { width: 970, height: 120 };
        case 'rectangle':
          return { width: 400, height: 300 };
        case 'skyscraper':
          return { width: 160, height: 600 };
        case 'mobile':
          return { width: 320, height: 100 };
        default:
          return { width: 728, height: 90 };
      }
    }
    
    // Utiliser la position comme fallback
    if (position) {
      switch (position) {
        case 'header':
        case 'footer':
          return { width: 728, height: 90 };
        case 'sidebar':
          return { width: 300, height: 250 };
        case 'content':
          return { width: 728, height: 90 };
        default:
          return { width: 300, height: 250 };
      }
    }
    
    // Valeur par défaut
    return { width: 300, height: 250 };
  }, [format, position]);

  // Simuler le chargement de l'annonce
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsLoaded(true), 500);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Texte de l'annonce
  const adText = useMemo(() => {
    return `Publicité ${format || position || 'default'}`;
  }, [format, position]);

  // ID unique pour l'annonce
  const adId = id || `ad-${format || position || 'default'}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div 
      id={adId}
      className={`ad-wrapper relative overflow-hidden ${className}`}
      style={{ 
        width: '100%', 
        maxWidth: `${adSize.width}px`,
        height: `${adSize.height}px`,
        margin: '0 auto',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative w-full h-full border border-[var(--border-color)] rounded-xl overflow-hidden transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-[var(--card-bg)] flex items-center justify-center animate-pulse">
            <span className="text-[var(--text-muted)] text-sm">Chargement de l'annonce...</span>
          </div>
        )}
        
        <div className="w-full h-full" style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)', transition: 'transform 0.3s' }}>
          <PlaceholderImage 
            width={adSize.width} 
            height={adSize.height} 
            text={adText}
          />
        </div>
        
        <div className="absolute top-1 right-2 text-[10px] text-[var(--text-muted)] bg-[var(--bg-color)] bg-opacity-70 px-1 rounded">
          Publicité
        </div>
        
        <button 
          className="absolute top-1 left-2 text-[10px] text-[var(--text-muted)] bg-[var(--bg-color)] bg-opacity-70 px-1 rounded hover:bg-opacity-100 transition-all"
          onClick={(e) => {
            e.preventDefault();
            alert('Annonce fermée');
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
} 