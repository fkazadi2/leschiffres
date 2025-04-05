import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Récupérer l'en-tête pour vérifier si un interstitiel doit être affiché
  const shouldShowInterstitial = request.headers.get('X-Show-Interstitial') === 'true';
  
  // Retourner le résultat
  return NextResponse.json({
    showInterstitial: shouldShowInterstitial,
  });
} 