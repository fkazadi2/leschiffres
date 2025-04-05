'use client';

import { useState } from 'react';
import DataChart from './DataChart';

// Types pour les données de filtrage
interface FilterOption {
  value: string;
  label: string;
}

// Exemple de catégories
const categoryOptions: FilterOption[] = [
  { value: 'tous', label: 'Toutes catégories' },
  { value: 'economie', label: 'Économie' },
  { value: 'politique', label: 'Politique' },
  { value: 'social', label: 'Social' },
  { value: 'culture', label: 'Culture' },
];

// Exemple de périodes
const periodOptions: FilterOption[] = [
  { value: '7d', label: '7 derniers jours' },
  { value: '1m', label: 'Dernier mois' },
  { value: '3m', label: 'Dernier trimestre' },
  { value: '1y', label: 'Dernière année' },
];

// Exemple de données pour les graphiques
const exampleData = {
  economicGrowth: {
    title: 'Croissance économique',
    description: 'Évolution du PIB en % sur les dernières années',
    series: [
      {
        id: 'gdp',
        name: 'PIB',
        color: '#4361ee',
        data: [
          { label: '2018', value: 1.9 },
          { label: '2019', value: 2.2 },
          { label: '2020', value: -5.7 },
          { label: '2021', value: 6.8 },
          { label: '2022', value: 3.5 },
          { label: '2023', value: 2.1 },
        ],
      },
    ],
  },
  inflation: {
    title: 'Inflation',
    description: 'Taux d\'inflation en % sur les dernières années',
    series: [
      {
        id: 'inflation',
        name: 'Inflation',
        color: '#e63946',
        data: [
          { label: '2018', value: 1.2 },
          { label: '2019', value: 1.5 },
          { label: '2020', value: 0.9 },
          { label: '2021', value: 2.8 },
          { label: '2022', value: 5.6 },
          { label: '2023', value: 4.2 },
        ],
      },
    ],
  },
  unemployment: {
    title: 'Chômage',
    description: 'Taux de chômage en % de la population active',
    series: [
      {
        id: 'unemployment',
        name: 'Taux de chômage',
        color: '#fb8500',
        data: [
          { label: '2018', value: 9.1 },
          { label: '2019', value: 8.5 },
          { label: '2020', value: 10.2 },
          { label: '2021', value: 9.8 },
          { label: '2022', value: 7.4 },
          { label: '2023', value: 7.1 },
        ],
      },
    ],
  },
  foreignInvestment: {
    title: 'Investissements étrangers',
    description: 'Entrées d\'investissements directs étrangers en milliards d\'€',
    series: [
      {
        id: 'fdi',
        name: 'IDE',
        color: '#2a9d8f',
        data: [
          { label: '2018', value: 23.4 },
          { label: '2019', value: 28.1 },
          { label: '2020', value: 15.6 },
          { label: '2021', value: 31.2 },
          { label: '2022', value: 36.7 },
          { label: '2023', value: 33.5 },
        ],
      },
    ],
  },
};

export default function Dashboard() {
  // États pour les filtres
  const [selectedCategory, setSelectedCategory] = useState<string>('tous');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1y');

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute w-96 h-96 rounded-full bg-[var(--secondary)] opacity-5 filter blur-[100px] -bottom-32 -left-32 z-0"></div>
      <div className="absolute w-80 h-80 rounded-full bg-[var(--primary)] opacity-5 filter blur-[100px] top-20 right-20 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-48 left-10 w-40 h-40 rounded-full border border-[rgba(var(--text-color-rgb),0.05)]"></div>
        <div className="absolute top-100 right-20 w-60 h-60 rounded-full border border-[rgba(var(--text-color-rgb),0.03)]"></div>
        <div className="absolute bottom-40 left-[40%] w-20 h-20 rounded-full border border-[rgba(var(--text-color-rgb),0.05)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-color)] relative inline-block mb-4">
            Tableau de bord économique
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-[var(--primary)]"></span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-3xl">
            Suivez les indicateurs économiques clés et leur évolution au fil du temps. Ces données sont mises à jour régulièrement pour vous offrir une vision claire des tendances économiques.
          </p>
        </div>
        
        <div className="bg-[var(--card-bg)] rounded-xl p-4 mb-8 cyberpunk-border">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--primary)]"></span>
                <span className="text-sm text-[var(--text-muted)]">Analyses en temps réel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--secondary)]"></span>
                <span className="text-sm text-[var(--text-muted)]">Données vérifiées</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--accent)]"></span>
                <span className="text-sm text-[var(--text-muted)]">Prévisions IA</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {/* Filtre de catégorie */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[rgba(var(--text-color-rgb),0.05)] border border-[rgba(var(--text-color-rgb),0.1)] rounded-md px-3 py-2 text-sm text-[var(--text-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[var(--card-bg)]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Filtre de période */}
              <div>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-[rgba(var(--text-color-rgb),0.05)] border border-[rgba(var(--text-color-rgb),0.1)] rounded-md px-3 py-2 text-sm text-[var(--text-color)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-transparent"
                >
                  {periodOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[var(--card-bg)]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Container principal pour les graphiques avec défilement horizontal */}
        <div className="relative">
          {/* Effet overlay à gauche */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none"></div>
          
          {/* Effet overlay à droite */}
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none"></div>
          
          {/* Wrapper des graphiques avec défilement horizontal */}
          <div className="flex overflow-x-auto gap-6 pb-4 px-4 custom-scrollbar snap-x snap-mandatory">
            <div className="w-96 flex-shrink-0 snap-start">
              <DataChart 
                title={exampleData.economicGrowth.title}
                description={exampleData.economicGrowth.description}
                series={exampleData.economicGrowth.series}
                defaultType="line"
              />
            </div>
            
            <div className="w-96 flex-shrink-0 snap-start">
              <DataChart 
                title={exampleData.inflation.title}
                description={exampleData.inflation.description}
                series={exampleData.inflation.series}
                defaultType="bar"
              />
            </div>
            
            <div className="w-96 flex-shrink-0 snap-start">
              <DataChart 
                title={exampleData.unemployment.title}
                description={exampleData.unemployment.description}
                series={exampleData.unemployment.series}
                defaultType="line"
              />
            </div>
            
            <div className="w-96 flex-shrink-0 snap-start">
              <DataChart 
                title={exampleData.foreignInvestment.title}
                description={exampleData.foreignInvestment.description}
                series={exampleData.foreignInvestment.series}
                defaultType="bar"
              />
            </div>
          </div>
          
          {/* Indicateurs de défilement */}
          <div className="flex justify-center mt-4 gap-2">
            <div className="w-8 h-1 bg-[var(--primary)] rounded-full"></div>
            <div className="w-2 h-1 bg-[var(--text-muted)] rounded-full"></div>
            <div className="w-2 h-1 bg-[var(--text-muted)] rounded-full"></div>
            <div className="w-2 h-1 bg-[var(--text-muted)] rounded-full"></div>
          </div>
        </div>
        
        {/* Légende et infos complémentaires */}
        <div className="mt-8 border-t border-[rgba(var(--text-color-rgb),0.1)] pt-6 flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(var(--text-color-rgb),0.05)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-[var(--text-muted)]">Les données sont mises à jour quotidiennement à partir de sources officielles.</p>
          </div>
          
          <button className="mt-4 md:mt-0 px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[rgba(var(--primary-rgb),0.1)] transition-colors text-sm group">
            <span className="group-hover:pl-1 transition-all">Télécharger les données</span>
          </button>
        </div>
      </div>
    </section>
  );
} 