import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Provider } from './provider';
import Footer from '@/components/feature/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Random Color Palette Generator',
  description: 'Generate and save random color palettes with ease.',
  alternates: {
    canonical: '/',
  },
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
