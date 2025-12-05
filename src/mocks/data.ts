import type { Team, Player } from "../types";

export const teamsMock: Team[] = [
  { id: 1, name: "Lions FC", city: "Maribor" },
  { id: 2, name: "Eagles FC", city: "Ljubljana" },
];

export const playersMock: Player[] = [
  { id: 1, teamId: 1, name: "Ana", position: "FW", number: 9 },
  { id: 2, teamId: 1, name: "Sara", position: "MF", number: 8 },
  { id: 3, teamId: 2, name: "Eva", position: "GK", number: 1 },
];
