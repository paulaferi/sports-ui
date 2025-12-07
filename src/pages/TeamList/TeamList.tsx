import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Team } from "../../types";
import { getTeams, createTeam, deleteTeam } from "../../api/teams";
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

  async function handleDeleteTeam(teamId: string | number, teamName: string) {
    if (
      !window.confirm(
        `¿Estás seguro de eliminar el equipo "${teamName}"? Esto también eliminará todos sus jugadores.`,
      )
    ) {
      return;
    }

    try {
      await deleteTeam(teamId);
      setTeams((prev) => prev.filter((t) => t.id !== teamId));
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("No se pudo eliminar el equipo. Inténtalo de nuevo.");
    }
  }

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section className="team-list layout">
      <div className="layout__main">
        <h2>Teams</h2>
        {teams.length === 0 ? (
          <div className="team-list__empty">
            No teams yet. Create your first team!
          </div>
        ) : (
          <ul className="team-list__items">
            {teams.map((t) => (
              <li key={t.id} className="team-list__item">
                <Link to={`/team/${t.id}`} className="team-list__link">
                  <div className="team-list__info">
                    <span className="team-list__name">{t.name}</span>
                    <span className="team-list__city">{t.city}</span>
                  </div>
                  <span className="team-list__arrow">→</span>
                </Link>
                <button
                  className="team-list__delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteTeam(t.id, t.name);
                  }}
                  aria-label={`Eliminar equipo ${t.name}`}
                  title="Eliminar equipo"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <aside className="layout__sidebar">
        <TeamForm onSubmit={handleAddTeam} />
      </aside>
    </section>
  );
}
