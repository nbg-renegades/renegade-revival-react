"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from "@/hooks/useLanguage";
import { Instagram } from "lucide-react";
const logoAvatar = '/assets/logo-avatar.png';
const Footer = () => {
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch('/logo.png', { method: 'HEAD' })
      .then((res) => {
        if (!mounted) return;
        if (!res.ok) setLogoError(true);
      })
      .catch(() => {
        if (!mounted) return;
        setLogoError(true);
      });
    return () => {
      mounted = false;
    };
  }, []);
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" legacyBehavior>
              <a className="flex items-center gap-3 mb-4">
                {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Nürnberg Renegades"
                  className="h-10 w-auto"
                  onError={(e) => {
                    // log and fall back to avatar
                    // eslint-disable-next-line no-console
                    console.error('logo.png failed to load', e?.nativeEvent || e);
                    setLogoError(true);
                  }}
                />
                ) : (
                  <img
                    src={logoAvatar}
                    alt="Nürnberg Renegades"
                    className="h-10 w-auto"
                  />
                )}
                <span className="font-display text-lg tracking-wide">Nürnberg Renegades e.V.</span>
              </a>
            </Link>
            <p className="text-muted-foreground text-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-primary">{t.footer.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/team" legacyBehavior>
                  <a className="text-muted-foreground hover:text-primary transition-colors">{t.nav.team}</a>
                </Link>
              </li>
              <li>
                <Link href="/club" legacyBehavior>
                  <a className="text-muted-foreground hover:text-primary transition-colors">{t.nav.club}</a>
                </Link>
              </li>
              <li>
                <Link href="/training" legacyBehavior>
                  <a className="text-muted-foreground hover:text-primary transition-colors">{t.nav.training}</a>
                </Link>
              </li>
              <li>
                <Link href="/sponsoring" legacyBehavior>
                  <a className="text-muted-foreground hover:text-primary transition-colors">{t.nav.sponsoring}</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a className="text-muted-foreground hover:text-primary transition-colors">{t.nav.contact}</a>
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.5erdffl.de/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  DFFL Website
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-primary">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" legacyBehavior>
                  <a className="text-muted-foreground hover:text-primary transition-colors">{t.footer.impressum}</a>
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" legacyBehavior>
                  <a className="text-muted-foreground hover:text-primary transition-colors">{t.footer.datenschutz}</a>
                </Link>
              </li>
            </ul>

            <h4 className="font-display text-lg mb-4 mt-6 text-primary">{t.nav.contact}</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <a 
                  href="mailto:info@nuernberg-renegades.de" 
                  className="hover:text-primary transition-colors"
                >
                  info@nuernberg-renegades.de
                </a>
              </p>
              <a 
                href="https://www.instagram.com/renegades_nuernberg/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @renegades_nuernberg
              </a>
              <p>Nürnberg, Germany</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nürnberg Renegades e.V. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;