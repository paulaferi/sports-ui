import { useParams } from "react-router-dom";
import { teamsMock, playersMock } from "../../mocks/data";
import { Body } from "../../components/Body/Body";
import type { Team, Player } from "../../types";

export function TeamDetails() {
  const { id } = useParams();
  const teamId = Number(id);

  const team: Team | undefined = teamsMock.find((t) => t.id === teamId);
  const players: Player[] = playersMock.filter((p) => p.teamId === teamId);

  if (!team) return <p>Team not found.</p>;

  return <Body team={team} players={players} />;
}
