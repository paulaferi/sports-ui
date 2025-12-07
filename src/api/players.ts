import { http } from "./http";
import type { Player } from "../types";

export async function getPlayersByTeam(
  teamId: string | number,
): Promise<Player[]> {
  try {
    const { data } = await http.get<Player[]>("/players", {
      params: { teamId },
    });
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 404) return [];
    return [];
  }
}

export async function createPlayer(
  payload: Omit<Player, "id">,
): Promise<Player> {
  const { data } = await http.post<Player>("/players", payload);
  return data;
}
