import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Users, Target, Award } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { supabase } from "@/lib/supabase";

const Club = () => {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [memberType, setMemberType] = useState<"active" | "supporting">("active");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not available");
      }

      const recaptchaToken = await executeRecaptcha("membership_form");
      const formData = new FormData(e.currentTarget);

      // Get current month and year for join date
      const now = new Date();
      const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
      const currentYear = String(now.getFullYear());

      const application = {
        membership_active: memberType === "active",
        membership_support: memberType === "supporting",
        name: formData.get("lastName") as string,
        firstname: formData.get("firstName") as string,
        birthday: formData.get("dob") as string,
        birthplace: formData.get("pob") as string,
        profession: formData.get("profession") as string || "",
        nationality: formData.get("nationality") as string || "",
        street: formData.get("street") as string,
        plz_town: formData.get("city") as string,
        tel: formData.get("phone") as string || "",
        fax: "",
        mobile: formData.get("mobile") as string || "",
        email: formData.get("email") as string,
        joindate_month: currentMonth,
        joindate_year: currentYear,
        sepa_account_holder_name: formData.get("sepaLastName") as string || "",
        sepa_account_holder_firstname: formData.get("sepaFirstName") as string || "",
        sepa_iban: formData.get("sepaIban") as string || "",
        sepa_bic: formData.get("sepaBic") as string || "",
        sepa_bank: formData.get("sepaBank") as string || "",
        recaptchaToken,
      };

      const { error } = await supabase.functions.invoke("send-membership-application", {
        body: { application },
      });

      if (error) throw error;

      toast({
        title: "Antrag gesendet!",
        description: "Wir melden uns bald mit weiteren Informationen bei dir.",
      });

      (e.target as HTMLFormElement).reset();
      setMemberType("active");
    } catch (error) {
      console.error("Error submitting membership form:", error);
      toast({
        title: "Fehler",
        description: "Antrag konnte nicht gesendet werden. Bitte versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Unser Verein</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Erfahre mehr über Nürnberg Renegades e.V.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-8">Über Nürnberg Renegades e.V.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Trophy className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">Vereinsgründung</h3>
                <p className="text-muted-foreground text-sm">
                  Nürnberg Renegades e.V. wurde 2022 mit dem Ziel gegründet, Flag Football in der Region Nürnberg zu etablieren und zu fördern.
                </p>
              </div>
              
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">Vereinsführung</h3>
                <p className="text-muted-foreground text-sm">
                  Unser Verein wird von einem engagierten Vorstand geleitet, der aus erfahrenen Spielern und Sportmanagern besteht, die ehrenamtlich arbeiten.
                </p>
              </div>
              
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">Erfolge</h3>
                <p className="text-muted-foreground text-sm">
                  Aufstieg in die 1. DFFL Division, mehrere regionale Turniersiege und die Entwicklung von über 50 aktiven Spielern.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8">
              Was als kleine Gruppe von Footballbegeisterten begann, hat sich zu einem der führenden Flag Football Vereine in Bayern entwickelt. Unser Verein ist stolz darauf, sowohl Anfänger als auch erfahrene Spieler auf ihrem sportlichen Weg zu unterstützen.
            </p>
          </div>
        </div>
      </section>

      {/* Become a Member */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-4">Mitglied werden</h2>
            <p className="text-muted-foreground mb-8">
              Werde Teil unserer Flag Football Familie! Als Vereinsmitglied erhältst du Zugang zu professionellem Training, Turnieren und einer tollen Gemeinschaft von Sportbegeisterten.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold">Mitgliedsvorteile</span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Professionelles Training mit erfahrenen Trainern
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Teilnahme an regionalen und nationalen Turnieren
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Teil einer starken Sportgemeinschaft werden
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Zugang zu Vereinsausrüstung und Einrichtungen
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl text-center mb-4">Mitgliedsantrag stellen</h2>
            <p className="text-muted-foreground text-center mb-8">
              Fülle das folgende Formular aus, um deinen Mitgliedsantrag zu stellen. Dies ist keine direkte Aufnahme, sondern ein optimierter Weg für dich, dem Verein beizutreten. Du erhältst weitere Informationen per E-Mail.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Member Type */}
              <div>
                <label className="block text-sm font-medium mb-3">Mitgliedschaftsart <span className="text-primary">*</span></label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="memberType"
                      checked={memberType === "active"}
                      onChange={() => setMemberType("active")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>Aktives Mitglied</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="memberType"
                      checked={memberType === "supporting"}
                      onChange={() => setMemberType("supporting")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>Fördermitglied</span>
                  </label>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Nachname <span className="text-primary">*</span>
                  </label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    Vorname <span className="text-primary">*</span>
                  </label>
                  <Input id="firstName" name="firstName" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium mb-2">
                    Geburtsdatum <span className="text-primary">*</span>
                  </label>
                  <Input id="dob" name="dob" type="date" required />
                </div>
                <div>
                  <label htmlFor="pob" className="block text-sm font-medium mb-2">
                    Geburtsort <span className="text-primary">*</span>
                  </label>
                  <Input id="pob" name="pob" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium mb-2">
                    Beruf
                  </label>
                  <Input id="profession" name="profession" />
                </div>
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium mb-2">
                    Nationalität
                  </label>
                  <Input id="nationality" name="nationality" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="street" className="block text-sm font-medium mb-2">
                  Straße, Hausnummer <span className="text-primary">*</span>
                </label>
                <Input id="street" name="street" required />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  PLZ, Ort <span className="text-primary">*</span>
                </label>
                <Input id="city" name="city" placeholder="90411 Nürnberg" required />
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                    Mobil
                  </label>
                  <Input id="mobile" name="mobile" type="tel" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-Mail <span className="text-primary">*</span>
                </label>
                <Input id="email" name="email" type="email" required />
              </div>

              {/* SEPA Section */}
              <div className="border-t border-border pt-6 mt-6">
                <h3 className="font-display text-xl mb-4">SEPA-Lastschriftmandat</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Für die Einziehung des Mitgliedsbeitrags benötigen wir deine Bankdaten.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sepaLastName" className="block text-sm font-medium mb-2">
                      Kontoinhaber Nachname
                    </label>
                    <Input id="sepaLastName" name="sepaLastName" />
                  </div>
                  <div>
                    <label htmlFor="sepaFirstName" className="block text-sm font-medium mb-2">
                      Kontoinhaber Vorname
                    </label>
                    <Input id="sepaFirstName" name="sepaFirstName" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="sepaIban" className="block text-sm font-medium mb-2">
                    IBAN
                  </label>
                  <Input id="sepaIban" name="sepaIban" placeholder="DE89 3704 0044 0532 0130 00" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="sepaBic" className="block text-sm font-medium mb-2">
                      BIC
                    </label>
                    <Input id="sepaBic" name="sepaBic" />
                  </div>
                  <div>
                    <label htmlFor="sepaBank" className="block text-sm font-medium mb-2">
                      Kreditinstitut
                    </label>
                    <Input id="sepaBank" name="sepaBank" />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Wird gesendet..." : "Antrag absenden"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Club;