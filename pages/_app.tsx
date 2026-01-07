"use client";
import '../src/index.css';
import type { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { RecaptchaProvider } from '@/components/RecaptchaProvider';
import { LanguageProvider } from '@/hooks/useLanguage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <LanguageProvider>
          <RecaptchaProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Navbar />
              <main className="min-h-screen">
                <Component {...pageProps} />
              </main>
              <Footer />
            </TooltipProvider>
          </RecaptchaProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
