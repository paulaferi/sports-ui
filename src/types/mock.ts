// src/types/mock.ts
import type { Team } from "./index";

export const mockTeams: Team[] = [
  {
    id: 1,
    name: "Lions FC",
    city: "Maribor",
    players: [
      { id: 1, name: "Ana", position: "FW", number: 9 },
      { id: 2, name: "Sara", position: "MF", number: 8 },
    ],
  },
  {
    id: 2,
    name: "Eagles FC",
    city: "Ljubljana",
    players: [],
  },
];
