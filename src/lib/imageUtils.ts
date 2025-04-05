/**
 * Utilitaires pour la gestion des images
 */

/**
 * Fonction qui génère une URL d'image locale au lieu d'utiliser Unsplash
 * @param width largeur de l'image
 * @param height hauteur de l'image
 * @param keywords mots-clés pour l'image (utilisés comme texte)
 * @returns URL de l'image générée
 */
export function getLocalImageUrl(width: number, height: number, keywords?: string): string {
  // Liste de couleurs pour les images
  const colors = [
    { bg: '#f87171', text: '#ffffff' }, // rouge
    { bg: '#fb923c', text: '#ffffff' }, // orange
    { bg: '#facc15', text: '#000000' }, // jaune
    { bg: '#4ade80', text: '#000000' }, // vert
    { bg: '#2dd4bf', text: '#000000' }, // turquoise
    { bg: '#60a5fa', text: '#ffffff' }, // bleu
    { bg: '#a78bfa', text: '#ffffff' }, // violet
    { bg: '#f472b6', text: '#ffffff' }, // rose
  ];

  // Choisir une couleur aléatoire en fonction des keywords
  const colorIndex = keywords 
    ? Math.abs(keywords.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length
    : Math.floor(Math.random() * colors.length);
  
  const { bg, text } = colors[colorIndex];
  
  // Créer le texte à afficher (prendre les 2 premiers mots-clés)
  const displayText = keywords 
    ? keywords.split(',').slice(0, 2).join(' ') 
    : 'Image';
  
  // Créer le SVG pour l'image
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg}" stop-opacity="1" />
          <stop offset="100%" stop-color="${darkenColor(bg, 20)}" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="${Math.min(width, height) * 0.08}px" 
        fill="${text}" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${displayText}
      </text>
    </svg>
  `;
  
  // Encoder le SVG pour l'utiliser comme URL
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Assombrit une couleur hexadécimale d'un certain pourcentage
 * @param hex couleur hexadécimale
 * @param percent pourcentage d'assombrissement
 * @returns couleur assombrie
 */
function darkenColor(hex: string, percent: number): string {
  // Convertir hex en RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Assombrir
  const factor = 1 - percent / 100;
  const newR = Math.floor(r * factor);
  const newG = Math.floor(g * factor);
  const newB = Math.floor(b * factor);
  
  // Convertir en hex
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
} 