import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware pour insérer dynamiquement les annonces
export function middleware(request: NextRequest) {
  // Récupérer ou initialiser le compteur de pages vues
  const pageViewsCount = Number(request.cookies.get('pageViewsCount')?.value || '0');
  
  // Récupérer ou initialiser le marqueur de temps de session
  const sessionStart = Number(request.cookies.get('sessionStart')?.value || Date.now().toString());
  
  // Créer la réponse
  const response = NextResponse.next();
  
  // Incrémenter le compteur de pages vues
  response.cookies.set('pageViewsCount', (pageViewsCount + 1).toString(), {
    maxAge: 60 * 60 * 24, // 24 heures
    path: '/',
  });
  
  // Définir le temps de début de session si c'est la première page vue
  if (pageViewsCount === 0) {
    response.cookies.set('sessionStart', Date.now().toString(), {
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    });
  }
  
  // Vérifier si l'utilisateur a vu plus de 3 pages ou est sur le site depuis plus de 2 minutes
  const shouldShowInterstitial = 
    pageViewsCount >= 3 || 
    (Date.now() - Number(sessionStart)) > 2 * 60 * 1000; // 2 minutes
  
  // Définir un en-tête personnalisé pour indiquer si un interstitiel doit être affiché
  // Ce sera utilisé côté client pour déclencher l'affichage d'une pub interstitielle
  if (shouldShowInterstitial) {
    response.headers.set('X-Show-Interstitial', 'true');
    
    // Réinitialiser le compteur après avoir affiché une pub interstitielle
    response.cookies.set('pageViewsCount', '0', {
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    });
  }
  
  return response;
}

// Configuration pour indiquer sur quels chemins le middleware doit s'exécuter
export const config = {
  matcher: [
    // Exécuter sur toutes les routes de page, sauf /api/, _next/ et les fichiers statiques
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 