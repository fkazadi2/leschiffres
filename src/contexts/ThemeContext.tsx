'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  isThemeLoaded: boolean;
  toggleTheme: () => void;
}

// Créer un script qui s'exécute avant React pour éviter le flash
const themeScript = `
  (function() {
    try {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = storedTheme || (prefersDark ? 'dark' : 'light');
      const root = document.documentElement;
      
      // Définir une classe de transition sur le document
      // Mais la retirer pendant le chargement initial pour éviter de voir la transition
      root.classList.add('no-transitions');
      
      root.setAttribute('data-theme', defaultTheme);
      
      // Réactiver les transitions après le chargement
      setTimeout(() => {
        root.classList.remove('no-transitions');
      }, 100);
    } catch (e) {
      console.warn('Failed to set initial theme', e);
    }
  })();
`;

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isThemeLoaded: false,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  
  // Effet pour initialiser le thème
  useEffect(() => {
    try {
      // Récupérer le thème stocké ou utiliser les préférences système
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
      
      // Mettre à jour l'état sans transition au chargement initial
      setTheme(initialTheme);
      setIsThemeLoaded(true);
      
    } catch (e) {
      console.warn('Failed to get theme from localStorage', e);
      setIsThemeLoaded(true);
    }
  }, []);
  
  // Mettre à jour les variables CSS et localStorage lorsque le thème change
  useEffect(() => {
    if (!isThemeLoaded) return;
    
    try {
      // Ajouter la classe 'theme-transition' pour activer les transitions
      const root = document.documentElement;
      root.classList.add('theme-transition');
      
      // Appliquer le thème
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      
      // Retirer la classe après la transition pour éviter les transitions non désirées
      const transitionTimeout = setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 1000); // La durée doit correspondre à la durée de transition dans CSS
      
      return () => clearTimeout(transitionTimeout);
    } catch (e) {
      console.warn('Failed to set theme', e);
    }
  }, [theme, isThemeLoaded]);
  
  // Effet pour écouter les changements de préférence système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Ne mettre à jour que si l'utilisateur n'a pas explicitement choisi un thème
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    // Définir l'écouteur d'événements pour les préférences système
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback pour les navigateurs plus anciens
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback pour les navigateurs plus anciens
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, isThemeLoaded, toggleTheme }}>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
} 