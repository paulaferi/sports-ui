import { Link } from "react-router-dom";
import type { Team } from "../../types";
import "./TeamList.css";

// Datos temporales estáticos:
const teams: Team[] = [
  { id: 1, name: "Lions FC", city: "Maribor", players: [] },
  { id: 2, name: "Eagles FC", city: "Ljubljana", players: [] },
];

export function TeamList() {
  return (
    <section className="team-list">
      <h2>Teams</h2>
      <ul className="team-list__items">
        {teams.map((t) => (
          <li key={t.id} className="team-list__item">
            <Link to={`/teams/${t.id}`}>
              {t.name} — {t.city}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
