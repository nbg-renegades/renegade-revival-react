import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Trophy, ExternalLink, MapPin, Calendar, ChevronRight } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import SEOHead, { OrganizationSchema } from "@/components/SEOHead";
const heroImage = '/assets/hero-field.jpg';
const actionImage = '/assets/action-play.jpg';
const teamHuddleImage = '/assets/team-huddle.jpg';
const flagFootballAction = '/assets/flag-football-action.png';
import { useLanguage } from "@/hooks/useLanguage";
const Index = () => {
  const {
    t,
    language
  } = useLanguage();
  return <main className="min-h-screen pt-16">
      <SEOHead title={language === "de" ? "Nürnberg Renegades e.V. | Flag Football 1. DFFL Liga" : "Nürnberg Renegades e.V. | Flag Football 1st DFFL League"} description={language === "de" ? "Nürnberg Renegades e.V. - Dein Flag Football Team in Nürnberg. Wir spielen in der 1. DFFL Liga. Probetraining für alle Levels willkommen!" : "Nürnberg Renegades e.V. - Your Flag Football Team in Nürnberg. We compete in the 1st DFFL League. Try-outs welcome for all skill levels!"} />
      <OrganizationSchema />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroImage})`
      }} role="img" aria-label="Flag Football field with team players" />
        <div className="absolute inset-0 bg-hero-gradient" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 animate-fade-up px-2">
            {t.index.heroTitle}<br />
            <span className="text-gradient">{t.index.heroSubtitle}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up-delay-1">
            {language === "de" ? "Werde Teil eines der erfolgreichsten Flag Football Teams in Bayern. Training für alle Levels - vom Anfänger bis zum Profi." : "Join one of the most successful flag football teams in Bavaria. Training for all levels - from beginner to pro."}
          </p>
          <div className="animate-fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training" legacyBehavior>
              <a>
                <Button variant="hero" size="xl">{t.index.heroCta}</Button>
              </a>
            </Link>
            <Link href="/team" legacyBehavior>
              <a>
                <Button variant="outline" size="xl">{language === 'de' ? 'Team kennenlernen' : 'Meet the Team'}
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* About Flag Football Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                {language === "de" ? "Was ist Flag Football?" : "What is Flag Football?"}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {language === "de" ? "Flag Football ist die kontaktlose Variante des American Football. Statt Tackles werden die Spielzüge durch das Ziehen von Flaggen beendet. Der Sport ist schnell, taktisch anspruchsvoll und für alle Altersgruppen und Fitnesslevel geeignet." : "Flag Football is the non-contact version of American Football. Instead of tackles, plays are stopped by pulling flags. The sport is fast, tactically demanding, and suitable for all ages and fitness levels."}
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                {language === "de" ? "Seit 2028 ist Flag Football olympische Disziplin bei den Olympischen Spielen in Los Angeles - ein Sport mit großer Zukunft!" : "Since 2028, Flag Football is an Olympic sport at the Los Angeles Olympics - a sport with a great future!"}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium">{language === "de" ? "5 vs 5 Spieler" : "5 vs 5 Players"}</span>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-medium">{language === "de" ? "Olympisch 2028" : "Olympic 2028"}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img alt="Flag Football action shot with players running plays on a green field" className="rounded-2xl shadow-card w-full object-cover aspect-video" loading="lazy" src={flagFootballAction} />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg hidden md:block">
                <p className="font-display text-3xl">2022</p>
                <p className="text-sm opacity-90">{language === "de" ? "Gegründet" : "Founded"}</p>
              </div>
            </div>
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
            <a href="https://www.5erdffl.de/" target="_blank" rel="noopener noreferrer" aria-label="Visit DFFL Website - Deutsche Flag Football Liga">
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                DFFL Website
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Team Spirit Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img src={teamHuddleImage} alt="Nürnberg Renegades team huddle showing team spirit and unity" className="rounded-2xl shadow-card w-full object-cover aspect-square" loading="lazy" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                {language === "de" ? "Mehr als nur ein Team" : "More Than Just a Team"}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {language === "de" ? "Bei den Nürnberg Renegades geht es um mehr als nur Sport. Wir sind eine Familie, die gemeinsam trainiert, gewinnt und wächst. Unser Team besteht aus Spielern aller Altersgruppen und Hintergründe." : "At Nürnberg Renegades, it's about more than just sports. We're a family that trains, wins, and grows together. Our team consists of players of all ages and backgrounds."}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-muted-foreground">
                    {language === "de" ? "Regelmäßige Teamevents und gemeinsame Aktivitäten" : "Regular team events and group activities"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-muted-foreground">
                    {language === "de" ? "Mentoring-Programm für neue Spieler" : "Mentoring program for new players"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-muted-foreground">
                    {language === "de" ? "Internationale Turniere und Auswärtsfahrten" : "International tournaments and away trips"}
                  </span>
                </li>
              </ul>
              <Link href="/club" legacyBehavior>
                <a>
                  <Button variant="default" size="lg">{language === 'de' ? 'Mehr über uns' : 'Learn More About Us'}
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl mb-4 text-center">
            {t.index.featuresTitle}
          </h2>
          <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto mb-12">
            {language === "de" ? "Entdecke, was die Nürnberg Renegades besonders macht und warum Spieler aller Levels bei uns trainieren." : "Discover what makes Nürnberg Renegades special and why players of all levels train with us."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon={Users} title={t.index.feature1Title} description={t.index.feature1Desc} delay="animate-fade-up" />
            <FeatureCard icon={TrendingUp} title={t.index.feature2Title} description={t.index.feature2Desc} delay="animate-fade-up-delay-1" />
            <FeatureCard icon={Trophy} title={t.index.feature3Title} description={t.index.feature3Desc} delay="animate-fade-up-delay-2" />
          </div>
        </div>
      </section>

      {/* Training Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl mb-12 text-center">
              {language === "de" ? "Training in Nürnberg" : "Training in Nürnberg"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="bg-card-gradient rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl">{language === "de" ? "Trainingszeiten" : "Training Times"}</h3>
                    <p className="text-muted-foreground text-sm">{language === "de" ? "Regelmäßig & zuverlässig" : "Regular & reliable"}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>{language === "de" ? "Dienstag" : "Tuesday"}</span>
                    <span className="font-medium text-foreground">19:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{language === "de" ? "Donnerstag" : "Thursday"}</span>
                    <span className="font-medium text-foreground">19:00 - 21:00</span>
                  </li>
                </ul>
              </article>
              
              <article className="bg-card-gradient rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl">{language === "de" ? "Standort" : "Location"}</h3>
                    <p className="text-muted-foreground text-sm">Nürnberg, Bayern</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  {language === "de" ? "Unser Trainingsgelände befindet sich zentral in Nürnberg mit guter Anbindung an öffentliche Verkehrsmittel." : "Our training ground is centrally located in Nürnberg with good public transport connections."}
                </p>
                <Link href="/training" legacyBehavior>
                  <a className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                    {language === "de" ? "Mehr erfahren" : "Learn more"}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            {language === "de" ? "Bereit für Flag Football?" : "Ready for Flag Football?"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            {language === "de" ? "Melde dich für ein kostenloses Probetraining an und erlebe Flag Football hautnah!" : "Sign up for a free try-out session and experience flag football firsthand!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/training" legacyBehavior>
              <a>
                <Button variant="hero" size="xl">{t.index.heroCta}</Button>
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a>
                <Button variant="outline" size="xl">{t.nav.contact}</Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </main>;
};
export default Index;