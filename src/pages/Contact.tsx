import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not available");
      }

      const recaptchaToken = await executeRecaptcha("contact_form");
      const formData = new FormData(e.currentTarget);

      const message = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string || "General Inquiry",
        message: formData.get("message") as string,
        recaptchaToken,
      };

      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: { message },
      });

      if (error) throw error;

      toast({
        title: t.contact.successTitle,
        description: t.contact.successDesc,
      });

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: t.contact.errorTitle,
        description: t.contact.errorDesc,
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
          <h1 className="font-display text-5xl md:text-6xl mb-4">{t.contact.title}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="font-display text-3xl mb-6">{t.contact.getInTouch}</h2>
              
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.contact.email}</h3>
                    <a 
                      href="mailto:info@nuernberg-renegades.de"
                      className="text-primary hover:underline"
                    >
                      info@nuernberg-renegades.de
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-display text-xl mb-3">{t.contact.followUs}</h3>
                <p className="text-muted-foreground text-sm">{t.contact.followUsDesc}</p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-display text-3xl mb-6">{t.contact.sendMessage}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t.contact.name} <span className="text-primary">*</span>
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t.contact.email} <span className="text-primary">*</span>
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t.contact.emailPlaceholder}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t.contact.subject}
                  </label>
                  <Input 
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder={t.contact.subjectPlaceholder}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t.contact.message} <span className="text-primary">*</span>
                  </label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder={t.contact.messagePlaceholder}
                    rows={5}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t.contact.submitting
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t.contact.submit}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;