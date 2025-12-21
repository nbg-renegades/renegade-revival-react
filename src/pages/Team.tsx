import { User } from "lucide-react";

interface PlayerCardProps {
  name: string;
  position: string;
  number?: string;
  isCoach?: boolean;
}

const PlayerCard = ({ name, position, number, isCoach = false }: PlayerCardProps) => (
  <div className="bg-card-gradient rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-card group">
    <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
      <User className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
    <div className="text-center">
      <h3 className="font-display text-xl mb-1">{name}</h3>
      {number && (
        <span className="text-primary font-bold text-sm">#{number}</span>
      )}
      <p className="text-muted-foreground text-sm mt-1">{position}</p>
      {isCoach && (
        <span className="inline-block mt-2 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
          Coach
        </span>
      )}
    </div>
  </div>
);

const coaches = [
  { name: "Fabian Schramm", position: "Defensive Coach" },
  { name: "Stanislav Voronkov", position: "Offensive Coach" },
];

const players = [
  { name: "Ben Bohnsack", number: "0", position: "Wide Receiver" },
  { name: "Camilo Fajardo", number: "1", position: "Wide Receiver" },
  { name: "Jonas Brand", number: "2", position: "Defensive Back" },
  { name: "Johannes Mörz", number: "3", position: "Defensive Back" },
  { name: "Oscar Melendez", number: "5", position: "Defensive Back" },
  { name: "Duc Tien Hoang", number: "7", position: "Player" },
  { name: "Kai Ottmann", number: "8", position: "Quarterback" },
  { name: "James Slack", number: "10", position: "Quarterback" },
  { name: "Fabian Schramm", number: "11", position: "Defensive Back" },
  { name: "Niklas Böhm", number: "12", position: "Wide Receiver" },
  { name: "Lukas Büttner", number: "13", position: "Wide Receiver" },
  { name: "Artem Feshchenko", number: "14", position: "Defensive Back" },
  { name: "Jonas Hofmann", number: "15", position: "Rusher" },
  { name: "Ben Taylor", number: "19", position: "Wide Receiver" },
  { name: "Stanislav Voronkov", number: "23", position: "Center" },
  { name: "Lasse Wenninger", number: "31", position: "Rusher" },
  { name: "Noah Bärnreuther", number: "37", position: "Center" },
  { name: "Tobias Sippel", number: "50", position: "Rusher" },
  { name: "Eduard Isaak", number: "77", position: "Defensive Back" },
  { name: "Niklas Benz", number: "80", position: "Wide Receiver" },
  { name: "Philipp Kreuz", number: "82", position: "Wide Receiver" },
  { name: "Stefan Buhr", number: "83", position: "Center" },
  { name: "Felix Kießling", number: "87", position: "Wide Receiver" },
  { name: "Erik Müller", number: "89", position: "Wide Receiver" },
];

const Team = () => {
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
            {coaches.map((coach) => (
              <PlayerCard
                key={coach.name}
                name={coach.name}
                position={coach.position}
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
            {players.map((player) => (
              <PlayerCard
                key={`${player.name}-${player.number}`}
                name={player.name}
                number={player.number}
                position={player.position}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;
