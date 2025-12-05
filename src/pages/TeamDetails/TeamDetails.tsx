import { useMemo, useState } from "react";
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

  //ELiminar
  function addMockPlayer() {
    const nextId = Math.max(0, ...players.map((p) => p.id)) + 1;
    setPlayers((prev) => [
      ...prev,
      { id: nextId, teamId, name: `New ${nextId}`, position: "MF", number: 20 },
    ]);
  }
  //Hatsa aqui
  if (!team) return <p>Team not found.</p>;

  return (
    <>
      <button onClick={addMockPlayer} style={{ margin: "1rem" }}>
        Add player (test)
      </button>
      <Body team={team} players={players} />
    </>
  );
}
