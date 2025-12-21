import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import maxPharmaLogo from "@/assets/sponsors/max-pharma.svg";
import footballshopLogo from "@/assets/sponsors/american-footballshop.png";

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
      Visit Website
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
  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Our Sponsors</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We thank our partners for their valuable support
          </p>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.name} {...sponsor} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl mb-6">Become a Sponsor</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Support our team and gain visibility in the local sports community. 
            Contact us to learn more about our sponsorship packages.
          </p>
          <Link to="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Sponsoring;
