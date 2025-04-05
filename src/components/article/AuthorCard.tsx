'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

interface AuthorCardProps {
  author: Author;
  showFullBio?: boolean;
}

export default function AuthorCard({ author, showFullBio = false }: AuthorCardProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-xl p-6 border border-[var(--border-color)] flex flex-col md:flex-row items-center md:items-start gap-6 fade-in">
      {/* Photo de profil de l'auteur */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--primary)] flex-shrink-0">
        <Image
          src={author.avatar}
          alt={author.name}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Informations sur l'auteur */}
      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-bold text-[var(--text-color)]">
          {author.name}
        </h3>
        
        <p className="text-[var(--primary)] font-medium text-sm mb-2">
          {author.role}
        </p>
        
        <p className="text-[var(--text-color)] text-sm mb-4">
          {showFullBio 
            ? author.bio 
            : author.bio.length > 150 
              ? `${author.bio.substring(0, 150)}...` 
              : author.bio
          }
        </p>
        
        {/* Réseaux sociaux */}
        <div className="flex space-x-3 justify-center md:justify-start">
          {author.twitterUrl && (
            <a
              href={author.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[#1DA1F2] transition-colors"
              aria-label={`Profil Twitter de ${author.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
          )}
          
          {author.linkedinUrl && (
            <a
              href={author.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[#0077B5] transition-colors"
              aria-label={`Profil LinkedIn de ${author.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
          )}
          
          <Link
            href={`/auteurs/${author.id}`}
            className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
            aria-label={`Voir tous les articles de ${author.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 