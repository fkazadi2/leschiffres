import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
  // Chemin de la requête
  const path = request.nextUrl.pathname;

  // Vérifier si le chemin commence par /admin
  if (path.startsWith('/admin') && path !== '/admin/login') {
    // Créer un client Supabase pour le middleware
    const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });
    
    // Vérifier si l'utilisateur est connecté
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Si aucune session, rediriger vers la page de connexion
    if (!session) {
      const redirectUrl = new URL('/admin/login', request.url);
      // Ajouter le chemin d'origine comme paramètre pour rediriger après connexion
      redirectUrl.searchParams.set('redirectedFrom', path);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Vérifier si l'utilisateur a les droits d'administration
    // Dans une application réelle, vous pourriez vérifier un rôle spécifique
    const { data: user } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
    
    if (!user || user.role !== 'admin') {
      // Rediriger vers la page d'accueil si non admin
      // Ceci est simulé pour la démonstration, en pratique cela dépendrait de votre modèle de données
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Si le chemin est /admin/login et que l'utilisateur est déjà connecté,
  // rediriger vers le tableau de bord admin
  if (path === '/admin/login') {
    const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

// Définir les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: ['/admin/:path*'],
}; 