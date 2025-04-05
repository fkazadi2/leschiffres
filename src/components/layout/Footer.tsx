'use client';

import Link from 'next/link';
import Image from 'next/image';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">
                <span className="text-[var(--primary)] neon-text">Le</span>
                <span className="text-[var(--text-color)]">Shiiffes</span>
                <span className="text-[var(--primary)]">.</span>
              </h2>
            </Link>
            <p className="text-[var(--text-muted)] text-sm mb-6">
              Le média d'analyse de données pour comprendre les enjeux économiques,
              politiques et sociaux à travers des visualisations innovantes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.05)] hover:bg-[rgba(var(--text-color-rgb),0.1)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.05)] hover:bg-[rgba(var(--text-color-rgb),0.1)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.05)] hover:bg-[rgba(var(--text-color-rgb),0.1)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Colonnes */}
          <div className="md:col-span-2">
            <h3 className="text-[var(--text-color)] text-lg font-bold mb-4 relative inline-block">
              Navigation
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-[var(--primary)]"></span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">Home</Link></li>
                  <li><Link href="/trends" className="text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">Trends</Link></li>
                  <li><Link href="/reports" className="text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">Reports</Link></li>
                  <li><Link href="/social" className="text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">Social</Link></li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li><Link href="/culture" className="text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">Culture</Link></li>
                  <li><Link href="/sport" className="text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">Sports</Link></li>
                  <li><Link href="/media" className="text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">Media</Link></li>
                  <li><Link href="/about" className="text-[var(--text-muted)] text-sm hover:text-[var(--primary)] transition-colors">About</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Articles récents */}
          <div className="md:col-span-2">
            <h3 className="text-[var(--text-color)] text-lg font-bold mb-4 relative inline-block">
              Articles récents
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-[var(--primary)]"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="flex items-start group">
                  <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                    <Image 
                      src="https://source.unsplash.com/random/100x100/?data" 
                      alt="Article image" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">Analyse des tendances économiques 2023</h4>
                    <p className="text-xs text-[var(--text-muted)]">12 avril 2023</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-start group">
                  <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                    <Image 
                      src="https://source.unsplash.com/random/100x100/?tech" 
                      alt="Article image" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm text-[var(--text-color)] group-hover:text-[var(--primary)] transition-colors">L'impact de l'IA sur le marché du travail</h4>
                    <p className="text-xs text-[var(--text-muted)]">8 avril 2023</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-[var(--text-color)] text-lg font-bold mb-4 relative inline-block">
              Newsletter
              <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-[var(--primary)]"></span>
            </h3>
            <p className="text-[var(--text-muted)] text-sm mb-4">
              Restez informé des dernières analyses
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-[rgba(var(--text-color-rgb),0.05)] text-[var(--text-color)] px-4 py-2 rounded w-full outline-none text-sm border border-[var(--border-color)] focus:border-[var(--primary)]"
                required
              />
              <button
                type="submit"
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] w-full px-4 py-2 rounded text-sm transition-colors text-[var(--card-bg)]"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-[var(--border-color)] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--text-muted)] text-xs mb-2 md:mb-0">
            © {currentYear} <span className="text-[var(--primary)]">LeShiiffes</span>. Tous droits réservés.
          </p>
          
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-[var(--text-muted)] text-xs hover:text-[var(--primary)] transition-colors">Confidentialité</Link>
            <Link href="/terms" className="text-[var(--text-muted)] text-xs hover:text-[var(--primary)] transition-colors">Conditions</Link>
            <Link href="/cookies" className="text-[var(--text-muted)] text-xs hover:text-[var(--primary)] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 