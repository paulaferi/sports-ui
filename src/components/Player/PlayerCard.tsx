import type { Player } from "../../types";
import "./PlayerCard.css";

export function PlayerCard({
  player,
  onDelete,
}: {
  player: Player;
  onDelete?: (id: string | number) => void;
}) {
  const posClass = `player-card--${player.position.toLowerCase()}`;

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`¿Estás seguro de eliminar a ${player.name}?`)) {
      onDelete?.(player.id);
    }
  }

  return (
    <article className={`player-card ${posClass}`}>
      {onDelete && (
        <button
          className="player-card__delete"
          onClick={handleDelete}
          aria-label={`Eliminar a ${player.name}`}
          title="Eliminar jugador"
        >
          ×
        </button>
      )}

      <header className="player-card__header">
        <div className="player-card__avatar">{getInitials(player.name)}</div>
        <div className="player-card__info">
          <span className="player-card__number">#{player.number}</span>
          <h4 className="player-card__name">{player.name}</h4>
        </div>
      </header>

      <div className="player-card__meta">
        <span className="player-card__badge">{player.position}</span>
      </div>
    </article>
  );
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + second).toUpperCase();
}
