import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Instagram } from "lucide-react";
import logoAvatar from "@/assets/logo-avatar.png";
const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Nürnberg Renegades" 
                  className="h-10 w-auto"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <img 
                  src={logoAvatar} 
                  alt="Nürnberg Renegades" 
                  className="h-10 w-auto"
                />
              )}
              <span className="font-display text-lg tracking-wide">Nürnberg Renegades e.V.</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-primary">{t.footer.navigation}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.team}
                </Link>
              </li>
              <li>
                <Link to="/club" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.club}
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.training}
                </Link>
              </li>
              <li>
                <Link to="/sponsoring" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.sponsoring}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.nav.contact}
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
                <Link to="/impressum" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.impressum}
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.footer.datenschutz}
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