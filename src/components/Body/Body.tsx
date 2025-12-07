import { useEffect, useState } from "react";
import { type Team, type Player, MIN_PLAYERS } from "../../types";
import { PlayerCard } from "../Player/PlayerCard";
import { Warning } from "../Warning/Warning";
import { Info } from "../Info/Info";
import "./Body.css";

export function Body({
  team,
  players,
  onDeletePlayer,
}: {
  team: Team;
  players: Player[];
  onDeletePlayer?: (id: string | number) => void;
}) {
  const [count, setCount] = useState<number>(players.length);

  useEffect(() => {
    setCount(players.length);
  }, [players]);

  return (
    <section className="body">
      <h2>{team.name}</h2>
      <p className="body__meta">City: {team.city}</p>

      {count < MIN_PLAYERS ? <Warning count={count} /> : <Info count={count} />}

      <div className="body__players">
        {players.map((p) => (
          <PlayerCard key={p.id} player={p} onDelete={onDeletePlayer} />
        ))}
      </div>
    </section>
  );
}
