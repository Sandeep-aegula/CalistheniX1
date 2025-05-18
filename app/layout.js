'use client';

import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Header from '../components/header';

// Initialize Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// Initialize Press Start 2P font

// Create a Client Component wrapper for layout content that needs path access
const LayoutContent = ({ children }) => {
  const pathname = usePathname();
  const showHeader = pathname !== '/';

  return (
    <html lang="en" className={inter.className}>
      <body >
        {showHeader && <Header />}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <LayoutContent>{children}</LayoutContent>
    </ClerkProvider>
  );
}
