import type { Player } from "../../types";
import "./PlayerCard.css";

export function PlayerCard({ player }: { player: Player }) {
  const posClass = `player-card--${player.position.toLowerCase()}`;

  return (
    <article className={`player-card ${posClass}`}>
      <header className="player-card__header">
        <span className="player-card__number">#{player.number}</span>
        <h4 className="player-card__name">{player.name}</h4>
      </header>

      <div className="player-card__meta">
        <span className="player-card__badge">{player.position}</span>
      </div>
    </article>
  );
}
