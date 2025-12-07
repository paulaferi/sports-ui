import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Team, Player, PlayerPosition } from "../../types";
import { getTeamById } from "../../api/teams";
import { getPlayersByTeam, createPlayer } from "../../api/players";
import { Body } from "../../components/Body/Body";
import { PlayerForm } from "../../components/PlayerForm/PlayerForm";
import "./TeamDetails.css";

export function TeamDetails() {
  const { id } = useParams(); // id string
  const teamId = id!; // confía en la ruta /team/:id

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const teamData = await getTeamById(teamId);
        if (!mounted) return;
        setTeam(teamData);
      } catch {
        if (!mounted) return;
        setError("Team not found");
        setTeam(null);
        setLoading(false);
        return;
      }

      try {
        const playersData = await getPlayersByTeam(teamId);
        if (!mounted) return;
        setPlayers(playersData);
        document.title = `${teamData.name} — ${playersData.length} players`;
      } catch {
        if (!mounted) return;
        setPlayers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [teamId]);

  async function handleAddPlayer(values: {
    name: string;
    position: PlayerPosition;
    number: number;
  }) {
    try {
      const created = await createPlayer({
        teamId: teamId,
        name: values.name.trim(),
        position: values.position,
        number: values.number,
      });
      setPlayers((prev) => [...prev, created]);
    } catch {
      console.warn("Failed to create player");
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
