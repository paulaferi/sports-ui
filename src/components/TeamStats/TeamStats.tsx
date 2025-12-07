import type { Player } from "../../types";
import "./TeamStats.css";

type PositionStats = {
  GK: number;
  DF: number;
  MF: number;
  FW: number;
};

const POSITION_COLORS = {
  GK: "#4BCFFA", // Azul celeste
  DF: "#8C54CC", // Morado suave
  MF: "#FFD93D", // Amarillo cálido
  FW: "#FF6B6B", // Rojo-anaranjado
};

const POSITION_LABELS = {
  GK: "Goalkeepers",
  DF: "Defenders",
  MF: "Midfielders",
  FW: "Forwards",
};

export function TeamStats({ players }: { players: Player[] }) {
  const stats: PositionStats = {
    GK: 0,
    DF: 0,
    MF: 0,
    FW: 0,
  };

  players.forEach((player) => {
    stats[player.position]++;
  });

  const total = players.length;

  // Calcular ángulos para el gráfico circular
  let currentAngle = 0;
  const segments = Object.entries(stats)
    .filter(([_, count]) => count > 0)
    .map(([position, count]) => {
      const percentage = (count / total) * 100;
      const angle = (count / total) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;

      return {
        position: position as keyof PositionStats,
        count,
        percentage,
        startAngle,
        angle,
      };
    });

  // Crear el gradiente cónico para el gráfico
  const conicGradient = segments
    .map((seg) => {
      const color = POSITION_COLORS[seg.position];
      const start = seg.startAngle;
      const end = seg.startAngle + seg.angle;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return (
    <div className="team-stats">
      <h3 className="team-stats__title">Team Statistics</h3>

      <div className="team-stats__chart-container">
        <div
          className="team-stats__chart"
          style={{
            background:
              total > 0 ? `conic-gradient(${conicGradient})` : "#E0E0E0",
          }}
        >
          <div className="team-stats__chart-center">
            <span className="team-stats__total">{total}</span>
            <span className="team-stats__total-label">Players</span>
          </div>
        </div>
      </div>

      <div className="team-stats__legend">
        {Object.entries(stats).map(([position, count]) => (
          <div key={position} className="team-stats__legend-item">
            <span
              className="team-stats__legend-color"
              style={{
                backgroundColor:
                  POSITION_COLORS[position as keyof PositionStats],
              }}
            />
            <span className="team-stats__legend-label">
              {POSITION_LABELS[position as keyof PositionStats]}
            </span>
            <span className="team-stats__legend-count">{count}</span>
          </div>
        ))}
      </div>

      {total === 0 && (
        <p className="team-stats__empty">
          Añade jugadores para ver las estadísticas
        </p>
      )}
    </div>
  );
}
