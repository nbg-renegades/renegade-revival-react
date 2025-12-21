import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Megaphone, Network } from "lucide-react";
import maxPharmaLogo from "@/assets/sponsors/max-pharma.svg";
import footballshopLogo from "@/assets/sponsors/american-footballshop.png";
import { useLanguage } from "@/hooks/useLanguage";

interface SponsorCardProps {
  name: string;
  logo: string;
  description: string;
  website: string;
}

const SponsorCard = ({ name, logo, description, website }: SponsorCardProps) => (
  <div className="bg-card-gradient rounded-lg p-8 border border-border hover:border-primary/50 transition-all duration-300 shadow-card">
    <div className="h-20 mb-6 flex items-center justify-center">
      <img 
        src={logo} 
        alt={name} 
        className="max-h-full max-w-full object-contain"
      />
    </div>
    <h3 className="font-display text-2xl mb-3 text-center">{name}</h3>
    <p className="text-muted-foreground text-sm text-center mb-6">{description}</p>
    <a 
      href={website} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 text-primary hover:underline text-sm"
    >
      Website
      <ExternalLink className="w-4 h-4" />
    </a>
  </div>
);

const sponsors = [
  {
    name: "Max Pharma GmbH",
    logo: maxPharmaLogo,
    description: "Gesundheit und Leistung gehen Hand in Hand – im Sport genauso wie in der medizinischen Versorgung. Deshalb sind wir stolz, mit Max Pharma einen verlässlichen Partner an unserer Seite zu haben!",
    website: "https://www.max-pharma.de/"
  },
  {
    name: "American Footballshop.de",
    logo: footballshopLogo,
    description: "Wir bedanken uns bei unserem Partner American-Footballshop.de für die Unterstützung mit erstklassiger Ausrüstung.",
    website: "https://www.american-footballshop.de/"
  }
];

const Sponsoring = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">{t.sponsoring.title}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.sponsoring.subtitle}
          </p>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-4 text-center">{t.sponsoring.whyTitle}</h2>
            <p className="text-muted-foreground text-center mb-12">{t.sponsoring.whyDesc}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Megaphone className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{t.sponsoring.benefit1Title}</h3>
                <p className="text-muted-foreground text-sm">{t.sponsoring.benefit1Desc}</p>
              </div>
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{t.sponsoring.benefit2Title}</h3>
                <p className="text-muted-foreground text-sm">{t.sponsoring.benefit2Desc}</p>
              </div>
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Network className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{t.sponsoring.benefit3Title}</h3>
                <p className="text-muted-foreground text-sm">{t.sponsoring.benefit3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl mb-12 text-center">{t.sponsoring.partnersTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.name} {...sponsor} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl mb-6">{t.sponsoring.becomeTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t.sponsoring.becomeDesc}
          </p>
          <Link to="/contact">
            <Button size="lg">{t.sponsoring.contactUs}</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Sponsoring;