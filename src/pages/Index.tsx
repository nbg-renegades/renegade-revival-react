import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Trophy, ExternalLink } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import heroImage from "@/assets/hero-field.jpg";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 animate-fade-up">
            {t.index.heroTitle}<br />
            <span className="text-gradient">{t.index.heroSubtitle}</span>
          </h1>
          <div className="animate-fade-up-delay-2">
            <Link to="/training">
              <Button variant="hero" size="xl">
                {t.index.heroCta}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* DFFL Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                {t.index.dfflTitle}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              {t.index.dfflTitle}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t.index.dfflDescription}
            </p>
            <a 
              href="https://www.5erdffl.de/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                DFFL Website
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl mb-12 text-center">
            {t.index.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Users}
              title={t.index.feature1Title}
              description={t.index.feature1Desc}
              delay="animate-fade-up"
            />
            <FeatureCard
              icon={TrendingUp}
              title={t.index.feature2Title}
              description={t.index.feature2Desc}
              delay="animate-fade-up-delay-1"
            />
            <FeatureCard
              icon={Trophy}
              title={t.index.feature3Title}
              description={t.index.feature3Desc}
              delay="animate-fade-up-delay-2"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Link to="/contact">
            <Button variant="default" size="lg">
              {t.nav.contact}
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;