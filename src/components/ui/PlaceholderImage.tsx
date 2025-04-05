'use client';

import { useMemo } from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

/**
 * Composant qui génère une image placeholder locale
 * Ne dépend pas de services externes comme via.placeholder.com ou unsplash
 */
export default function PlaceholderImage({
  width,
  height,
  text = 'Image',
  bgColor = '#E5E7EB',
  textColor = '#1F2937',
  className = '',
}: PlaceholderImageProps) {
  // Générer une couleur de fond aléatoire si aucune n'est fournie
  const backgroundColor = useMemo(() => {
    if (bgColor !== '#E5E7EB') return bgColor;
    
    // Liste de couleurs pour les placeholders
    const colors = [
      '#f87171', // rouge
      '#fb923c', // orange
      '#facc15', // jaune
      '#4ade80', // vert
      '#2dd4bf', // turquoise
      '#60a5fa', // bleu
      '#a78bfa', // violet
      '#f472b6', // rose
    ];
    
    // Choisir une couleur aléatoire
    return colors[Math.floor(Math.random() * colors.length)];
  }, [bgColor]);

  // Créer un SVG pour l'image placeholder
  const svgContent = useMemo(() => {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="${Math.min(width, height) * 0.08}px" 
          fill="${textColor}" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${text}
        </text>
      </svg>
    `;
    
    // Utiliser directement le SVG avec une URL data
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [width, height, backgroundColor, textColor, text]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%', 
        height: height ? `${height}px` : '100%'
      }}
    >
      <div
        style={{
          backgroundImage: `url("${svgContent}")`,
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
} 