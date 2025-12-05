import { useState } from "react";
import { Link } from "react-router-dom";
import { teamsMock } from "../../mocks/data";
import type { Team } from "../../types";
import { TeamForm } from "../../components/TeamForm/TeamForm";
import "./TeamList.css";

export function TeamList() {
  const [teams, setTeams] = useState<Team[]>(teamsMock);

  function handleAddTeam(values: { name: string; city: string }) {
    const nextId = Math.max(0, ...teams.map((t) => t.id)) + 1;
    const newTeam: Team = {
      id: nextId,
      name: values.name.trim(),
      city: values.city.trim(),
    };
    setTeams((prev) => [...prev, newTeam]);
  }

  return (
    <section className="team-list layout">
      <div className="layout__main">
        <h2>Teams</h2>
        <ul className="team-list__items">
          {teams.map((t) => (
            <li key={t.id} className="team-list__item">
              <Link to={`/team/${t.id}`} className="team-list__link">
                {t.name} — {t.city}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <aside className="layout__sidebar">
        <TeamForm onSubmit={handleAddTeam} />
      </aside>
    </section>
  );
}
