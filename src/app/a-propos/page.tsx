import Image from 'next/image';
import Link from 'next/link';
import AdWrapper from '@/components/ads/AdWrapper';

// Données de l'équipe
const teamMembers = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Rédactrice en chef",
    bio: "Journaliste avec plus de 15 ans d'expérience dans la presse économique et politique. Ancienne correspondante à l'étranger.",
    imageUrl: "https://source.unsplash.com/random/300x300/?woman,professional,1"
  },
  {
    id: 2,
    name: "Jean Mbala",
    role: "Directeur de la publication",
    bio: "Fondateur du journal, Jean a créé LesCh1ffres.cd avec pour mission d'offrir une information de qualité et accessible à tous.",
    imageUrl: "https://source.unsplash.com/random/300x300/?man,professional,1"
  },
  {
    id: 3,
    name: "Sophie Kanza",
    role: "Responsable économie",
    bio: "Économiste de formation, elle analyse les tendances et transforme des données complexes en informations accessibles.",
    imageUrl: "https://source.unsplash.com/random/300x300/?woman,professional,2"
  },
  {
    id: 4,
    name: "Pierre Lumumba",
    role: "Responsable politique",
    bio: "Ancien conseiller politique reconverti dans le journalisme, il décrypte les coulisses du pouvoir avec précision.",
    imageUrl: "https://source.unsplash.com/random/300x300/?man,professional,2"
  },
  {
    id: 5,
    name: "Céline Mutombo",
    role: "Journaliste environnement",
    bio: "Passionnée par les questions climatiques, elle couvre les sujets environnementaux avec expertise et engagement.",
    imageUrl: "https://source.unsplash.com/random/300x300/?woman,professional,3"
  },
  {
    id: 6,
    name: "Thomas Kabila",
    role: "Responsable sport",
    bio: "Ancien sportif de haut niveau, il apporte son expertise et sa passion dans la couverture des événements sportifs.",
    imageUrl: "https://source.unsplash.com/random/300x300/?man,professional,3"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Bannière */}
      <section className="relative bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/about-banner.jpg" 
            alt="À propos de LesCh1ffres.cd" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/80 to-[var(--secondary)]/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">À Propos de LesCh1ffres</h1>
            <p className="text-xl text-white/80">
              Notre mission, notre équipe et nos valeurs
            </p>
          </div>
        </div>
      </section>
      
      {/* Notre histoire */}
      <section className="py-16 bg-[var(--bg-color)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-color)] mb-6 relative">
                Notre Histoire
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[var(--primary)]"></span>
              </h2>
              <p className="text-[var(--text-muted)] mb-4">
                Fondé en 2022, <span className="font-semibold">LesCh1ffres.cd</span> est né d'une ambition simple mais audacieuse : proposer un journalisme de qualité, factuel et accessible à tous les lecteurs.
              </p>
              <p className="text-[var(--text-muted)] mb-4">
                Dans un paysage médiatique saturé d'informations parfois approximatives ou orientées, nous avons souhaité créer un espace où l'information est vérifiée, contextualisée et présentée de manière claire.
              </p>
              <p className="text-[var(--text-muted)]">
                Notre nom reflète notre engagement : s'appuyer sur des faits concrets, des données vérifiables — des chiffres — pour éclairer le débat public et aider nos lecteurs à comprendre les enjeux de notre temps.
              </p>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl card-3d">
              <Image
                src="https://source.unsplash.com/random/800x600/?newsroom,media"
                alt="Notre rédaction"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Nos valeurs */}
      <section className="py-16 bg-[var(--card-bg)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[var(--text-color)] mb-12 text-center relative">
            Nos Valeurs
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[var(--primary)]"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[var(--bg-color)] p-8 rounded-3xl shadow-md fade-in card-3d">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-color)] mb-4">Indépendance</h3>
              <p className="text-[var(--text-muted)]">
                Notre indépendance éditoriale est non-négociable. Nous ne cédons à aucune pression politique ou commerciale qui compromettrait l'intégrité de notre travail journalistique.
              </p>
            </div>
            
            <div className="bg-[var(--bg-color)] p-8 rounded-3xl shadow-md fade-in delay-100 card-3d">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-color)] mb-4">Rigueur</h3>
              <p className="text-[var(--text-muted)]">
                Chaque information est vérifiée, recoupée et contextualisée. Nous préférons prendre le temps de la réflexion plutôt que céder à la course au scoop qui peut nuire à la qualité de l'information.
              </p>
            </div>
            
            <div className="bg-[var(--bg-color)] p-8 rounded-3xl shadow-md fade-in delay-200 card-3d">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-color)] mb-4">Diversité</h3>
              <p className="text-[var(--text-muted)]">
                Nous veillons à représenter la pluralité des opinions et des perspectives. Notre équipe reflète cette diversité, essentielle pour comprendre et relater la complexité du monde contemporain.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Publicité */}
      <div className="py-12 bg-[var(--bg-color)]">
        <div className="container mx-auto px-4">
          <AdWrapper position="content" />
        </div>
      </div>
      
      {/* Notre équipe */}
      <section className="py-16 bg-[var(--bg-color)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[var(--text-color)] mb-12 text-center relative">
            Notre Équipe
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[var(--primary)]"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-[var(--card-bg)] rounded-3xl overflow-hidden shadow-lg fade-in card-3d">
                <div className="relative h-64">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--text-color)] mb-1">{member.name}</h3>
                  <p className="text-[var(--primary)] text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-[var(--text-muted)]">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section className="py-16 bg-[var(--card-bg)]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[var(--text-color)] mb-6">Contactez-nous</h2>
            <p className="text-[var(--text-muted)] mb-8">
              Vous avez des questions, des suggestions ou souhaitez nous signaler une information ? Notre équipe est à votre écoute.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--bg-color)] p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">Contact presse</h3>
                <p className="text-[var(--text-muted)] mb-2">presse@leschiffres.cd</p>
                <p className="text-[var(--text-muted)]">+243 123 456 789</p>
              </div>
              
              <div className="bg-[var(--bg-color)] p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">Partenariats</h3>
                <p className="text-[var(--text-muted)] mb-2">partenariats@leschiffres.cd</p>
                <p className="text-[var(--text-muted)]">+243 987 654 321</p>
              </div>
            </div>
            
            <div className="mt-12">
              <Link href="#" className="btn-fancy inline-flex items-center justify-center px-8 py-4 border border-[var(--primary)] text-[var(--primary)] rounded-full hover:bg-[rgba(var(--primary-rgb),0.1)] transition-colors text-sm group">
                <span className="group-hover:translate-x-1 transition-transform">Formulaire de contact</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Publicité en bas de page */}
      <div className="container mx-auto px-4 py-8 mt-8">
        <AdWrapper position="footer" />
      </div>
    </div>
  );
} 