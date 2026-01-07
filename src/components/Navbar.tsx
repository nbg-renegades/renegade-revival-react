"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
const logoAvatar = '/assets/logo-avatar.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/';
  const { t } = useLanguage();

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.team, path: "/team" },
    { name: t.nav.club, path: "/club" },
    { name: t.nav.training, path: "/training" },
    { name: t.nav.sponsoring, path: "/sponsoring" },
    { name: t.nav.contact, path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src={logoAvatar}
            alt="Nürnberg Renegades" 
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-display text-xl tracking-wide text-foreground hidden sm:block">
            Nürnberg Renegades e.V.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} legacyBehavior>
              <a>
                <Button 
                  variant="nav" 
                  className={pathname === link.path ? 'text-primary' : ''}
                >
                  {link.name}
                </Button>
              </a>
            </Link>
          ))}
          <div className="flex items-center gap-1 ml-2 border-l border-border pl-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden transition-all duration-300 ease-out ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-4 pb-6 safe-area-inset-bottom">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} legacyBehavior>
                <a onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start h-12 text-base ${pathname === link.path ? 'text-primary bg-primary/10' : ''}`}
                  >
                    {link.name}
                  </Button>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;