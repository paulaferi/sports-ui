import { type Team, type Player, MIN_PLAYERS } from "../../types";
import { PlayerCard } from "../Player/PlayerCard";
import { Warning } from "../Warning/Warning";
import { Info } from "../Info/Info";
import "./Body.css";

export function Body({ team, players }: { team: Team; players: Player[] }) {
  const count = players.length;

  return (
    <section className="body">
      <h2>{team.name}</h2>
      <p className="body__meta">City: {team.city}</p>

      {count < MIN_PLAYERS ? <Warning count={count} /> : <Info count={count} />}

      <div className="body__players">
        {players.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </div>
    </section>
  );
}
