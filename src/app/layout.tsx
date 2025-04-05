import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InterstitialAd from '@/components/ads/InterstitialAd';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LesCh1ffres - Actualités économiques et politiques en RDC',
  description: 'Suivez les dernières actualités économiques, politiques et sociales de la République Démocratique du Congo avec analyses et données chiffrées.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-theme="dark">
      <body className={`${inter.className} bg-[var(--bg-color)] text-[var(--text-color)]`}>
        <ThemeProvider>
          <Header />
          <InterstitialAd />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
