export type PlayerPosition = "GK" | "DF" | "MF" | "FW";

export type Team = { id: string | number; name: string; city: string };
export type Player = {
  id: string | number;
  teamId: string | number;
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  number: number;
};

export const MIN_PLAYERS = 11;

export function isTeamComplete(count: number): boolean {
  return count >= MIN_PLAYERS;
}

export const UI_MESSAGES = {
  teamComplete: (count: number) => `Squad complete: ${count} players.`,
  teamIncomplete: (count: number) =>
    `The team has ${count} players. Add more to reach 11.`,
};

// Crear jugador desde formulario (sin id, con teamId en REST):
export type NewPlayer = Omit<Player, "id"> & { teamId: string | number };

// Crear equipo desde formulario (sin id, sin players):
export type NewTeam = Omit<Team, "id" | "players">;

// Respuesta de API para jugador (json-server devuelve id):
export type PlayerDTO = Required<Omit<Player, "players">>;

// Respuesta de API para equipo (json-server no adjunta players):
export type TeamDTO = Omit<Team, "players">;
