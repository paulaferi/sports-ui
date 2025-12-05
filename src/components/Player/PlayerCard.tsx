import type { Player } from "../../types";
import "./PlayerCard.css";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <article className="player-card">
      <h4 className="player-card__title">
        #{player.number} {player.name}
      </h4>
      <p className="player-card__pos">Position: {player.position}</p>
    </article>
  );
}
