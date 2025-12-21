import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Users, Target, Award } from "lucide-react";

const Club = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [memberType, setMemberType] = useState<"active" | "supporting">("active");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Application submitted!",
      description: "We'll contact you soon with further information.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Our Club</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Learn more about Nürnberg Renegades e.V.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-8">About Nürnberg Renegades e.V.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Trophy className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">Club Foundation</h3>
                <p className="text-muted-foreground text-sm">
                  Nürnberg Renegades e.V. was founded in 2022 with the goal of establishing and promoting flag football in the Nürnberg region.
                </p>
              </div>
              
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">Club Leadership</h3>
                <p className="text-muted-foreground text-sm">
                  Our club is led by a dedicated board consisting of experienced players and sports managers working on a voluntary basis.
                </p>
              </div>
              
              <div className="bg-card-gradient rounded-lg p-6 border border-border">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display text-xl mb-2">Achievements</h3>
                <p className="text-muted-foreground text-sm">
                  Promotion to the 1st DFFL Division, multiple regional tournament victories, and the development of over 50 active players.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8">
              What started as a small group of football enthusiasts has developed into one of the leading flag football clubs in Bavaria. Our club is proud to support both beginners and experienced players in their athletic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Become a Member */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl mb-4">Become a Member</h2>
            <p className="text-muted-foreground mb-8">
              Become part of our flag football family! As a club member, you get access to professional training, tournaments, and a great community of sports enthusiasts.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold">Membership Benefits</span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Professional training with experienced coaches
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Participation in regional and national tournaments
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Become part of a strong sports community
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Access to club equipment and facilities
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl text-center mb-4">Submit Membership Application</h2>
            <p className="text-muted-foreground text-center mb-8">
              Fill out the following form to submit your membership application. This is not a direct acceptance, but an optimized way for you to join the club. You will receive further information via email.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Member Type */}
              <div>
                <label className="block text-sm font-medium mb-3">Membership Type <span className="text-primary">*</span></label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="memberType"
                      checked={memberType === "active"}
                      onChange={() => setMemberType("active")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>Active Member</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="memberType"
                      checked={memberType === "supporting"}
                      onChange={() => setMemberType("supporting")}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>Supporting Member</span>
                  </label>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name <span className="text-primary">*</span>
                  </label>
                  <Input id="lastName" name="lastName" required />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name <span className="text-primary">*</span>
                  </label>
                  <Input id="firstName" name="firstName" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium mb-2">
                    Date of Birth <span className="text-primary">*</span>
                  </label>
                  <Input id="dob" name="dob" type="date" required />
                </div>
                <div>
                  <label htmlFor="pob" className="block text-sm font-medium mb-2">
                    Place of Birth <span className="text-primary">*</span>
                  </label>
                  <Input id="pob" name="pob" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium mb-2">
                    Profession
                  </label>
                  <Input id="profession" name="profession" />
                </div>
                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium mb-2">
                    Nationality
                  </label>
                  <Input id="nationality" name="nationality" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="street" className="block text-sm font-medium mb-2">
                  Street <span className="text-primary">*</span>
                </label>
                <Input id="street" name="street" required />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  Postal Code, City <span className="text-primary">*</span>
                </label>
                <Input id="city" name="city" placeholder="90411 Nürnberg" required />
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                    Mobile
                  </label>
                  <Input id="mobile" name="mobile" type="tel" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-primary">*</span>
                </label>
                <Input id="email" name="email" type="email" required />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Club;
