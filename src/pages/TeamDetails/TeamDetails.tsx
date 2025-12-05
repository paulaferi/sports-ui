import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { teamsMock, playersMock } from "../../mocks/data";
import { Body } from "../../components/Body/Body";
import type { Team, Player } from "../../types";

export function TeamDetails() {
  const { id } = useParams();
  const teamId = Number(id);

  const team: Team | undefined = useMemo(
    () => teamsMock.find((t) => t.id === teamId),
    [teamId],
  );

  const initialPlayers = useMemo(
    () => playersMock.filter((p) => p.teamId === teamId),
    [teamId],
  );

  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  useEffect(() => {
    if (team) document.title = `${team.name} — ${players.length} players`;
  }, [team, players.length]);

  if (!team) return <p>Team not found.</p>;

  function addPlayer(newPlayer: Omit<Player, "id">) {
    const nextId = Math.max(0, ...players.map((p) => p.id)) + 1;
    setPlayers((prev) => [...prev, { ...newPlayer, id: nextId }]);
  }

  function removePlayer(id: number) {
    setPlayers((prev) => prev.filter((p) => p.id !== id));
  }

  function updatePlayer(id: number, changes: Partial<Player>) {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...changes } : p)),
    );
  }

  return <Body team={team} players={players} />;
}
