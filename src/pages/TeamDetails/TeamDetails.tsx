import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Team, Player, PlayerPosition } from "../../types";
import { getTeamById } from "../../api/teams";
import { getPlayersByTeam, createPlayer } from "../../api/players";
import { Body } from "../../components/Body/Body";
import { PlayerForm } from "../../components/PlayerForm/PlayerForm";
import "./TeamDetails.css";

export function TeamDetails() {
  const { id } = useParams();
  const teamId = id;

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isFinite(teamId)) {
      setError("Invalid team id");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    (async () => {
      try {
        const teamData = await getTeamById(teamId);
        setTeam(teamData);
      } catch {
        // Si el equipo no existe, muestra error y corta
        setError("Team not found");
        setTeam(null);
        setLoading(false);
        return;
      }

      try {
        const playersData = await getPlayersByTeam(teamId);
        setPlayers(playersData);
        document.title = `${team!.name} — ${playersData.length} players`;
      } catch {
        // No bloquees la vista si falla la carga de jugadores
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [teamId]);

  async function handleAddPlayer(values: {
    name: string;
    position: PlayerPosition;
    number: number;
  }) {
    try {
      const created = await createPlayer({
        teamId,
        name: values.name.trim(),
        position: values.position, // asegúrate de usar el mismo tipo que la API (abreviaturas o nombres)
        number: values.number,
      });
      setPlayers((prev) => [...prev, created]);
    } catch {
      // Podrías mostrar un aviso local en el sidebar, pero no bloquees toda la página
      console.error("Failed to create player");
    }
  }

  if (loading) return <p>Loading team...</p>;

  return (
    <section className="team-details">
      {team ? (
        <>
          <div className="team-details__main">
            <Body team={team} players={players} />
          </div>
          <aside className="team-details__sidebar">
            <PlayerForm
              onSubmit={handleAddPlayer}
              defaultNumber={players.length + 1}
            />
          </aside>
        </>
      ) : (
        <p>Team not found.</p>
      )}
    </section>
  );
}
