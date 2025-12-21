import teamData from "@/data/teamMembers.json";
import playerPlaceholder from "@/assets/player-placeholder.avif";

interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  image_url: string | null;
  number: string | null;
  position: string | null;
  member_type: "player" | "staff";
}

interface PlayerCardProps {
  member: TeamMember;
  isCoach?: boolean;
}

const positionLabels: Record<string, string> = {
  db: "Defensive Back",
  receiver: "Wide Receiver",
  quarterback: "Quarterback",
  blitz: "Rusher",
  center: "Center",
};

const roleLabels: Record<string, string> = {
  offensive_coordinator: "Offensive Coordinator",
  defensive_coordinator: "Defensive Coordinator",
  head_coach: "Head Coach",
};

const PlayerCard = ({ member, isCoach = false }: PlayerCardProps) => (
  <div className="bg-card-gradient rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-card group">
    <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
      <img 
        src={member.image_url || playerPlaceholder} 
        alt={member.name}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="text-center">
      <h3 className="font-display text-xl mb-1">{member.name}</h3>
      {member.number && (
        <span className="text-primary font-bold text-sm">#{member.number}</span>
      )}
      <p className="text-muted-foreground text-sm mt-1">
        {isCoach && member.role 
          ? roleLabels[member.role] || member.role 
          : member.position 
            ? positionLabels[member.position] || member.position 
            : "Player"}
      </p>
      {isCoach && (
        <span className="inline-block mt-2 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
          Coach
        </span>
      )}
    </div>
  </div>
);

const Team = () => {
  const members = teamData.teamMembers as TeamMember[];
  const staff = members.filter(m => m.member_type === "staff");
  const players = members
    .filter(m => m.member_type === "player")
    .sort((a, b) => {
      const numA = parseInt(a.number || "999");
      const numB = parseInt(b.number || "999");
      return numA - numB;
    });

  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Our Team</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Meet the athletes and coaches of the Nürnberg Renegades
          </p>
        </div>
      </section>

      {/* Coaching Staff */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl text-center mb-12">Coaching Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6">
            {staff.map((member) => (
              <PlayerCard
                key={member.id}
                member={member}
                isCoach
              />
            ))}
          </div>
        </div>
      </section>

      {/* Players */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl text-center mb-12">Players</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.map((member) => (
              <PlayerCard
                key={member.id}
                member={member}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;
