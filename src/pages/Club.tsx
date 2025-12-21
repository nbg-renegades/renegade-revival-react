import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Users, Target, Award, Instagram } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/hooks/useLanguage";

const Club = () => {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useLanguage();
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
        title: t.club.successTitle,
        description: t.club.successDesc,
      });

      (e.target as HTMLFormElement).reset();
      setMemberType("active");
    } catch (error) {
      console.error("Error submitting membership form:", error);
      toast({
        title: t.club.errorTitle,
        description: t.club.errorDesc,
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
          <h1 className="font-display text-5xl md:text-6xl mb-4">{t.club.title}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.club.subtitle}
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-8">{t.club.aboutTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Trophy className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{t.club.foundationTitle}</h3>
                <p className="text-muted-foreground text-sm">{t.club.foundationDesc}</p>
              </div>
              
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{t.club.leadershipTitle}</h3>
                <p className="text-muted-foreground text-sm">{t.club.leadershipDesc}</p>
              </div>
              
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">{t.club.achievementsTitle}</h3>
                <p className="text-muted-foreground text-sm">{t.club.achievementsDesc}</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8">{t.club.historyText}</p>

            {/* Social Media */}
            <div className="bg-card-gradient rounded-lg p-6 border border-border">
              <h3 className="font-display text-xl mb-4">Social Media</h3>
              <a 
                href="https://www.instagram.com/renegades_nuernberg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">@renegades_nuernberg</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Member */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-4">{t.club.memberTitle}</h2>
            <p className="text-muted-foreground mb-8">{t.club.memberDesc}</p>

            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold">{t.club.benefitsTitle}</span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {t.club.benefit1}
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {t.club.benefit2}
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {t.club.benefit3}
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                {t.club.benefit4}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl text-center mb-4">{t.club.formTitle}</h2>
            <p className="text-muted-foreground text-center mb-8">{t.club.formDesc}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Member Type */}
              <div>
                <label className="block text-sm font-medium mb-3">{t.club.membershipType} <span className="text-primary">*</span></label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="memberType"
                      checked={memberType === "active"}
                      onChange={() => setMemberType("active")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>{t.club.activeMember}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="memberType"
                      checked={memberType === "supporting"}
                      onChange={() => setMemberType("supporting")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>{t.club.supportingMember}</span>
                  </label>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    {t.club.lastName} <span className="text-primary">*</span>
                  </label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    {t.club.firstName} <span className="text-primary">*</span>
                  </label>
                  <Input id="firstName" name="firstName" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium mb-2">
                    {t.club.dob} <span className="text-primary">*</span>
                  </label>
                  <Input id="dob" name="dob" type="date" required />
                </div>
                <div>
                  <label htmlFor="pob" className="block text-sm font-medium mb-2">
                    {t.club.pob} <span className="text-primary">*</span>
                  </label>
                  <Input id="pob" name="pob" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium mb-2">
                    {t.club.profession}
                  </label>
                  <Input id="profession" name="profession" />
                </div>
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium mb-2">
                    {t.club.nationality}
                  </label>
                  <Input id="nationality" name="nationality" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="street" className="block text-sm font-medium mb-2">
                  {t.club.street} <span className="text-primary">*</span>
                </label>
                <Input id="street" name="street" required />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  {t.club.city} <span className="text-primary">*</span>
                </label>
                <Input id="city" name="city" placeholder="90411 Nürnberg" required />
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t.club.phone}
                  </label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                    {t.club.mobile}
                  </label>
                  <Input id="mobile" name="mobile" type="tel" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t.club.email} <span className="text-primary">*</span>
                </label>
                <Input id="email" name="email" type="email" required />
              </div>

              {/* SEPA Section */}
              <div className="border-t border-border pt-6 mt-6">
                <h3 className="font-display text-xl mb-4">{t.club.sepaTitle}</h3>
                <p className="text-muted-foreground text-sm mb-4">{t.club.sepaDesc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sepaLastName" className="block text-sm font-medium mb-2">
                      {t.club.accountHolder} {t.club.lastName}
                    </label>
                    <Input id="sepaLastName" name="sepaLastName" />
                  </div>
                  <div>
                    <label htmlFor="sepaFirstName" className="block text-sm font-medium mb-2">
                      {t.club.accountHolder} {t.club.firstName}
                    </label>
                    <Input id="sepaFirstName" name="sepaFirstName" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="sepaIban" className="block text-sm font-medium mb-2">
                    {t.club.iban}
                  </label>
                  <Input id="sepaIban" name="sepaIban" placeholder="DE89 3704 0044 0532 0130 00" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="sepaBic" className="block text-sm font-medium mb-2">
                      {t.club.bic}
                    </label>
                    <Input id="sepaBic" name="sepaBic" />
                  </div>
                  <div>
                    <label htmlFor="sepaBank" className="block text-sm font-medium mb-2">
                      {t.club.bank}
                    </label>
                    <Input id="sepaBank" name="sepaBank" />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t.club.submitting : t.club.submit}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Club;