import { Link } from "react-router-dom";
import { teamsMock } from "../../mocks/data";
import type { Team } from "../../types";
import "./TeamList.css";

export function TeamList() {
  const teams: Team[] = teamsMock;

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
