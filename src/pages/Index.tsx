import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Trophy, ExternalLink } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import heroImage from "@/assets/hero-field.jpg";

const Index = () => {
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
            Experience Flag Football<br />
            <span className="text-gradient">in Nürnberg</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up-delay-1">
            Join the Nürnberg Renegades e.V. and be part of an exciting sports community
          </p>
          <div className="animate-fade-up-delay-2">
            <Link to="/training">
              <Button variant="hero" size="xl">
                Join Us Today
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
                First Division
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              First Division DFFL Team
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We are proud to compete in the First Division of the Deutsche Flag Football Liga (DFFL). 
              Our team represents Nürnberg at the highest level of competitive flag football in Germany.
            </p>
            <a 
              href="https://www.5erdffl.de/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit DFFL Website
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Users}
              title="Community"
              description="Join a passionate community of flag football enthusiasts"
              delay="animate-fade-up"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Development"
              description="Learn from experienced coaches and improve your skills"
              delay="animate-fade-up-delay-1"
            />
            <FeatureCard
              icon={Trophy}
              title="Competition"
              description="Participate in regional, national & international tournaments"
              delay="animate-fade-up-delay-2"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6">About Us</h2>
            <p className="text-muted-foreground text-lg">
              The Nürnberg Renegades e.V. is dedicated to promoting flag football and developing 
              players of all skill levels. We focus on building a strong community through 
              teamwork, sportsmanship, and competitive play.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Ready to Join?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Experience the thrill of flag football with us
          </p>
          <Link to="/contact">
            <Button variant="default" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
