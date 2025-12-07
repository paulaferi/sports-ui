import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Team } from "../../types";
import { getTeams, createTeam } from "../../api/teams";
import "./TeamList.css";
import { TeamForm } from "../../components/TeamForm/TeamForm";

export function TeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (err) {
        setError("Failed to load teams");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAddTeam(values: { name: string; city: string }) {
    try {
      const created = await createTeam({
        name: values.name,
        city: values.city,
      });
      setTeams((prev) => [...prev, created]);
    } catch {
      setError("Failed to create team");
    }
  }

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p role="alert">{error}</p>;

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
