import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Team, Player, PlayerPosition } from "../../types";
import { getTeamById } from "../../api/teams";
import {
  getPlayersByTeam,
  createPlayer,
  deletePlayer,
} from "../../api/players";
import { Body } from "../../components/Body/Body";
import { PlayerForm } from "../../components/PlayerForm/PlayerForm";
import { TeamStats } from "../../components/TeamStats/TeamStats";
import "./TeamDetails.css";

export function TeamDetails() {
  const { id } = useParams();
  const teamId = id!;

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    (async () => {
      try {
        const t = await getTeamById(teamId);
        if (!mounted) return;
        setTeam(t);
      } catch {
        if (!mounted) return;
        setTeam(null);
        setPlayers([]);
        setLoading(false);
        return;
      }

      try {
        const ps = await getPlayersByTeam(teamId);
        if (!mounted) return;
        setPlayers(ps);
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
    const created = await createPlayer({
      teamId,
      name: values.name.trim(),
      position: values.position,
      number: values.number,
    });
    setPlayers((prev) => [...prev, created]);
  }

  async function handleDeletePlayer(playerId: string | number) {
    try {
      await deletePlayer(playerId);
      setPlayers((prev) => prev.filter((p) => p.id !== playerId));
    } catch (error) {
      console.error("Error deleting player:", error);
      alert("No se pudo eliminar el jugador. Inténtalo de nuevo.");
    }
  }

  if (loading) return <p>Loading team...</p>;

  return (
    <section className="team-details">
      {team ? (
        <>
          <div className="team-details__main">
            <Body
              team={team}
              players={players}
              onDeletePlayer={handleDeletePlayer}
            />
          </div>
          <aside className="team-details__sidebar">
            <PlayerForm
              onSubmit={handleAddPlayer}
              defaultNumber={players.length + 1}
            />
            <TeamStats players={players} />
          </aside>
        </>
      ) : (
        <p>Team not found.</p>
      )}
    </section>
  );
}
