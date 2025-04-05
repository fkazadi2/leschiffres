'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

const menuItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Économie', path: '/categorie/economie' },
  { name: 'Politique', path: '/categorie/politique' },
  { name: 'Social', path: '/categorie/social' },
  { name: 'Culture', path: '/categorie/culture' },
  { name: 'Sport', path: '/categorie/sport' },
  { name: 'Justice', path: '/categorie/justice' },
  { name: 'Technologie', path: '/categorie/technologie' },
  { name: 'Environnement', path: '/categorie/environnement' },
  { name: 'Santé', path: '/categorie/sante' },
  { name: 'Éducation', path: '/categorie/education' },
  { name: 'Médias', path: '/categorie/medias' },
  { name: 'Histoire', path: '/categorie/histoire' },
  { name: 'À propos', path: '/a-propos' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme, toggleTheme, isThemeLoaded } = useTheme();
  const isDark = theme === 'dark';

  // Fonction pour définir l'index actif en fonction du chemin actuel
  const setActiveFromPath = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const index = menuItems.findIndex(item => item.path === path);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  };

  return (
    <header className="glassmorphism sticky top-0 z-50 border-b border-[var(--border-color)]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-[var(--primary)] neon-text">Le</span>
                <span className="text-[var(--text-color)]">sCh1ffres</span>
                <span className="text-[var(--primary)]">.cd</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation desktop */}
          <nav className="hidden md:flex flex-wrap justify-center space-x-1">
            {menuItems.slice(0, 8).map((item, index) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`px-3 py-2 text-sm hover:text-[var(--primary)] transition-all relative ${
                  index === activeIndex 
                    ? 'text-[var(--primary)]' 
                    : 'text-[var(--text-muted)]'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {item.name}
                {index === activeIndex && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"></span>
                )}
              </Link>
            ))}
            
            {/* Menu déroulant pour les autres catégories */}
            <div className="relative group">
              <button className="px-3 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] transition-all flex items-center">
                Plus
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {menuItems.slice(8).map((item, index) => (
                  <Link 
                    key={item.path}
                    href={item.path}
                    className="block px-4 py-2 text-sm hover:bg-[rgba(var(--text-color-rgb),0.05)] hover:text-[var(--primary)] transition-all"
                    onClick={() => setActiveIndex(index + 8)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          
          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Bouton switch de thème */}
            {isThemeLoaded && (
              <button
                type="button"
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                aria-pressed={isDark ? 'true' : 'false'}
              >
                <span className={`${isDark ? 'bg-[var(--primary)]' : 'bg-[var(--text-muted)]'} absolute h-6 w-11 rounded-full transition-colors duration-300 ease-in-out`}></span>
                
                {/* Indicateurs de mode */}
                <div className="absolute inset-0 flex justify-between items-center px-1">
                  {/* Icône de soleil */}
                  <div className={`${isDark ? 'opacity-30' : 'opacity-100'} text-yellow-300 transition-opacity duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-3.5 w-3.5" viewBox="0 0 16 16">
                      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                    </svg>
                  </div>
                  
                  {/* Icône de lune */}
                  <div className={`${isDark ? 'opacity-100' : 'opacity-30'} text-blue-200 transition-opacity duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-3.5 w-3.5" viewBox="0 0 16 16">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                    </svg>
                  </div>
                </div>
                
                <span
                  className={`${
                    isDark ? 'translate-x-6 bg-[var(--card-bg)]' : 'translate-x-1 bg-[var(--card-bg)]'
                  } inline-block h-4 w-4 transform rounded-full transition-transform duration-300 ease-in-out z-10`}
                />
                <span className="sr-only">{isDark ? 'Mode clair' : 'Mode sombre'}</span>
              </button>
            )}
            
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.1)] hover:bg-[rgba(var(--text-color-rgb),0.2)] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.1)] hover:bg-[rgba(var(--text-color-rgb),0.2)] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.1)] hover:bg-[rgba(var(--text-color-rgb),0.2)] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          
          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Bouton switch de thème sur mobile */}
            {isThemeLoaded && (
              <button
                type="button"
                onClick={toggleTheme}
                className="relative inline-flex h-5 w-9 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
                aria-pressed={isDark ? 'true' : 'false'}
              >
                <span className={`${isDark ? 'bg-[var(--primary)]' : 'bg-[var(--text-muted)]'} absolute h-5 w-9 rounded-full transition-colors duration-300 ease-in-out`}></span>
                
                {/* Indicateurs de mode */}
                <div className="absolute inset-0 flex justify-between items-center px-1">
                  {/* Icône de soleil */}
                  <div className={`${isDark ? 'opacity-30' : 'opacity-100'} text-yellow-300 transition-opacity duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-2.5 w-2.5" viewBox="0 0 16 16">
                      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                    </svg>
                  </div>
                  
                  {/* Icône de lune */}
                  <div className={`${isDark ? 'opacity-100' : 'opacity-30'} text-blue-200 transition-opacity duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-2.5 w-2.5" viewBox="0 0 16 16">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                    </svg>
                  </div>
                </div>
                
                <span
                  className={`${
                    isDark ? 'translate-x-5 bg-[var(--card-bg)]' : 'translate-x-1 bg-[var(--card-bg)]'
                  } inline-block h-3 w-3 transform rounded-full transition-transform duration-300 ease-in-out z-10`}
                />
                <span className="sr-only">{isDark ? 'Mode clair' : 'Mode sombre'}</span>
              </button>
            )}
            
            <button 
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.1)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menu mobile */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[var(--border-color)] pt-4">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={`text-sm hover:text-[var(--primary)] transition-colors ${
                    index === activeIndex ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 