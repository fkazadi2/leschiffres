'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function InterstitialAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Vérifier si l'en-tête X-Show-Interstitial est présent
    const checkForInterstitial = async () => {
      try {
        const response = await fetch('/api/check-interstitial');
        const data = await response.json();
        
        if (data.showInterstitial) {
          setIsVisible(true);
          
          // Démarrer le compte à rebours
          const timer = setInterval(() => {
            setSecondsLeft((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          
          // Fermer automatiquement après la fin du compte à rebours
          setTimeout(() => {
            setIsVisible(false);
          }, 5000);
          
          return () => clearInterval(timer);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'interstitiel:', error);
      }
    };
    
    checkForInterstitial();
  }, [pathname]);
  
  const handleClose = () => {
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-3xl rounded-4xl overflow-hidden shadow-2xl">
        {/* Fermer après le compte à rebours */}
        <div className="absolute top-4 right-4 z-10 flex items-center bg-black bg-opacity-50 text-white text-sm px-5 py-2.5 rounded-full">
          <span>Passer la publicité</span>
          <span className="ml-3 w-8 h-8 flex items-center justify-center rounded-full bg-white text-black font-medium">
            {secondsLeft}
          </span>
        </div>
        
        {/* Bouton de fermeture (activé seulement après le compte à rebours) */}
        {secondsLeft === 0 && (
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {/* Contenu de la publicité */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-12 text-white text-center">
          <div className="relative mx-auto w-80 h-80 mb-8 rounded-3xl overflow-hidden">
            <Image
              src="https://source.unsplash.com/random/300x300/?product"
              alt="Publicité"
              fill
              className="object-cover"
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-6">Offre Spéciale!</h2>
          <p className="text-xl mb-8">
            Profitez de -20% sur votre première commande avec le code PROMO20
          </p>
          
          <a 
            href="https://example.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 text-lg rounded-3xl hover:bg-opacity-90 transition-colors"
          >
            Découvrir l'offre
          </a>
        </div>
      </div>
    </div>
  );
} 