import { MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LocationCardProps {
  title: string;
  time: string;
  address: string[];
}

const LocationCard = ({ title, time, address }: LocationCardProps) => (
  <div className="bg-card-gradient rounded-lg p-6 border border-border">
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
  </div>
);

const Training = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Request submitted!",
      description: "We'll contact you soon about your try-out.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Training Information</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Join our training sessions and become part of the Renegades
          </p>
        </div>
      </section>

      {/* Off-Season */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="font-display text-3xl">Off-Season (November - March)</h2>
            </div>
            
            <p className="text-muted-foreground mb-8">
              During the off-season, we additionally train at an indoor facility on Tuesday to maintain our practice schedule throughout winter.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Schedule</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold">Tuesday</p>
                <p className="text-muted-foreground">8:00 PM - 10:00 PM</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold">Thursday</p>
                <p className="text-muted-foreground">7:00 PM - 9:00 PM</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocationCard
                title="Tuesday Location"
                time="8:00 PM - 10:00 PM"
                address={[
                  "Adalbert-Stifter-Schule",
                  "Julius-Leber-Straße 108",
                  "90473 Nürnberg"
                ]}
              />
              <LocationCard
                title="Thursday Location"
                time="7:00 PM - 9:00 PM"
                address={[
                  "Sportplatz",
                  "Kulmbacher Str. 1",
                  "90411 Nürnberg"
                ]}
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
              <h2 className="font-display text-3xl">Regular Season (April - October)</h2>
            </div>
            
            <p className="text-muted-foreground mb-8">
              During the regular season, all training sessions take place at our main facility.
            </p>

            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Schedule</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold">Tuesday</p>
                <p className="text-muted-foreground">7:00 PM - 9:00 PM</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <p className="font-semibold">Thursday</p>
                <p className="text-muted-foreground">7:00 PM - 9:00 PM</p>
              </div>
            </div>

            <LocationCard
              title="Main Location"
              time="All Sessions"
              address={[
                "Sportanlage DJK BFC",
                "Hofer Str. 30",
                "90411 Nürnberg"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Try-out Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl text-center mb-8">Request a Try-out</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <Input id="name" name="name" type="text" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium mb-2">
                    Age
                  </label>
                  <Input id="age" name="age" type="number" min="0" />
                </div>
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">
                  Previous Experience
                </label>
                <Input id="experience" name="experience" type="text" placeholder="e.g., Football, Basketball, etc." />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea id="message" name="message" rows={4} placeholder="Tell us about yourself..." />
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Training;
