import { MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/hooks/useLanguage";
import MapConsent from "@/components/MapConsent";

interface LocationCardProps {
  title: string;
  time: string;
  address: string[];
  latitude: number;
  longitude: number;
  language: "de" | "en";
}

const LocationCard = ({ title, time, address, latitude, longitude, language }: LocationCardProps) => (
  <div className="bg-card-gradient rounded-lg p-6 border border-border space-y-4">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <MapPin className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-primary text-sm mb-2">{time}</p>
        {address.map((line, i) => (
          <p key={i} className="text-muted-foreground text-sm">{line}</p>
        ))}
      </div>
    </div>
    <MapConsent
      latitude={latitude}
      longitude={longitude}
      title={title}
      address={address.join(", ")}
      language={language}
    />
  </div>
);

const Training = () => {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not available");
      }

      const recaptchaToken = await executeRecaptcha("tryout_form");
      const formData = new FormData(e.currentTarget);

      const request = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string || "",
        age: formData.get("age") as string || "",
        experience: formData.get("experience") as string || "",
        message: formData.get("message") as string || "",
        recaptchaToken,
      };

      const { error } = await supabase.functions.invoke("send-tryout-email", {
        body: { request },
      });

      if (error) throw error;

      toast({
        title: t.training.successTitle,
        description: t.training.successDesc,
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting tryout form:", error);
      toast({
        title: t.training.errorTitle,
        description: t.training.errorDesc,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Training location coordinates (verified via OpenStreetMap Nominatim)
  const locations = {
    adalbertStifter: {
      lat: 49.3950080,
      lng: 11.1345945,
      address: ["Adalbert-Stifter-Schule", "Julius-Leber-Straße 108", "90473 Nürnberg"]
    },
    kulmbach: {
      lat: 49.4890233,
      lng: 11.1133299,
      address: ["Sportplatz Ziegelstein", "Kulmbacher Str. 1", "90411 Nürnberg"]
    },
    djkBfc: {
      lat: 49.4907319,
      lng: 11.1114578,
      address: ["Sportanlage DJK BFC", "Hofer Str. 30", "90411 Nürnberg"]
    }
  };

  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">{t.training.title}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.training.subtitle}
          </p>
        </div>
      </section>

      {/* Off-Season */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="font-display text-3xl">{t.training.offSeasonTitle}</h2>
            </div>
            
            <p className="text-muted-foreground mb-8">{t.training.offSeasonDesc}</p>

            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">{t.training.scheduleTitle}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold">{t.training.tuesday}</p>
                <p className="text-muted-foreground">20:00 - 22:00</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold">{t.training.thursday}</p>
                <p className="text-muted-foreground">19:00 - 21:00</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationCard
                title={t.training.tuesdayLocation}
                time="20:00 - 22:00"
                address={locations.adalbertStifter.address}
                latitude={locations.adalbertStifter.lat}
                longitude={locations.adalbertStifter.lng}
                language={language}
              />
              <LocationCard
                title={t.training.thursdayLocation}
                time="19:00 - 21:00"
                address={locations.kulmbach.address}
                latitude={locations.kulmbach.lat}
                longitude={locations.kulmbach.lng}
                language={language}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Regular Season */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="font-display text-3xl">{t.training.regularSeasonTitle}</h2>
            </div>
            
            <p className="text-muted-foreground mb-8">{t.training.regularSeasonDesc}</p>

            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">{t.training.scheduleTitle}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold">{t.training.tuesday}</p>
                <p className="text-muted-foreground">19:00 - 21:00</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold">{t.training.thursday}</p>
                <p className="text-muted-foreground">19:00 - 21:00</p>
              </div>
            </div>

            <LocationCard
              title={t.training.mainLocation}
              time={t.training.allSessions}
              address={locations.djkBfc.address}
              latitude={locations.djkBfc.lat}
              longitude={locations.djkBfc.lng}
              language={language}
            />
          </div>
        </div>
      </section>

      {/* Try-out Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl text-center mb-8">{t.training.tryoutTitle}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t.training.name} <span className="text-primary">*</span>
                  </label>
                  <Input id="name" name="name" type="text" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t.training.email} <span className="text-primary">*</span>
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t.training.phone}
                  </label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium mb-2">
                    {t.training.age}
                  </label>
                  <Input id="age" name="age" type="number" min="0" />
                </div>
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">
                  {t.training.experience}
                </label>
                <Input id="experience" name="experience" type="text" placeholder={t.training.experiencePlaceholder} />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t.training.message}
                </label>
                <Textarea id="message" name="message" rows={4} placeholder={t.training.messagePlaceholder} />
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t.training.submitting : t.training.submit}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Training;
