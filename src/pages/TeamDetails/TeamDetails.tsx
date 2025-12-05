import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { teamsMock, playersMock } from "../../mocks/data";
import { Body } from "../../components/Body/Body";
import type { Team, Player } from "../../types";

export function TeamDetails() {
  const { id } = useParams();
  const teamId = Number(id);

  const team = useMemo(() => teamsMock.find((t) => t.id === teamId), [teamId]);
  const initialPlayers = useMemo(
    () => playersMock.filter((p) => p.teamId === teamId),
    [teamId],
  );

  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  useEffect(() => {
    // aquí iría el conteo dinámico o futuros fetch a API
    document.title = `${team?.name ?? "Team"} — ${players.length} players`;
  }, [players, team]);

  if (!team) return <p>Team not found.</p>;

  return <Body team={team} players={players} />;
}
