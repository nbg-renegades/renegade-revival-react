import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [logoError, setLogoError] = useState(false);

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
                <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center font-display text-primary-foreground text-lg">
                  NR
                </div>
              )}
              <span className="font-display text-lg tracking-wide">Nürnberg Renegades e.V.</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              First Division DFFL Team. Experience Flag Football at its best in Nürnberg.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/club" className="text-muted-foreground hover:text-primary transition-colors">
                  About the Club
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-muted-foreground hover:text-primary transition-colors">
                  Training Schedule
                </Link>
              </li>
              <li>
                <Link to="/sponsoring" className="text-muted-foreground hover:text-primary transition-colors">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
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
            <h4 className="font-display text-lg mb-4 text-primary">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <a 
                  href="mailto:info@nuernberg-renegades.de" 
                  className="hover:text-primary transition-colors"
                >
                  info@nuernberg-renegades.de
                </a>
              </p>
              <p>Nürnberg, Germany</p>
            </div>

            <h4 className="font-display text-lg mb-4 mt-6 text-primary">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/impressum" className="text-muted-foreground hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nürnberg Renegades e.V. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
