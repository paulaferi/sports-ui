import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { teamsMock, playersMock } from "../../mocks/data";
import { Body } from "../../components/Body/Body";
import { PlayerForm } from "../../components/PlayerForm/PlayerForm";
import type { Team, Player, PlayerPosition } from "../../types";
import "./TeamDetails.css";

export function TeamDetails() {
  const { id } = useParams();
  const teamId = Number(id);

  const team: Team | undefined = useMemo(
    () => teamsMock.find((t) => t.id === teamId),
    [teamId],
  );

  const initialPlayers: Player[] = useMemo(
    () => playersMock.filter((p) => p.teamId === teamId),
    [teamId],
  );

  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  useEffect(() => {
    if (team) document.title = `${team.name} — ${players.length} players`;
  }, [team, players.length]);

  if (!team) return <p>Team not found.</p>;

  // Handler de envío: añade el jugador al estado local
  function handleAddPlayer(values: {
    name: string;
    position: PlayerPosition;
    number: number;
  }) {
    const nextId = Math.max(0, ...players.map((p) => p.id)) + 1;

    // Normalización básica
    const name = values.name.trim();
    const position = values.position;
    const number = Number(values.number);

    if (!name) return; // podrías mostrar un error en el formulario
    if (number <= 0) return;

    const newPlayer: Player = {
      id: nextId,
      teamId,
      name,
      position,
      number,
    };

    setPlayers((prev) => [...prev, newPlayer]); // actualiza el estado
  }

  return (
    <section className="team-details">
      <div className="team-details__main">
        <Body team={team} players={players} />
      </div>
      <aside className="team-details__sidebar">
        <PlayerForm
          onSubmit={handleAddPlayer}
          defaultNumber={players.length + 1}
        />
      </aside>
    </section>
  );
}
