import { http } from "./http";
import type { Player } from "../types";

export async function getPlayersByTeam(
  teamId: string | number,
): Promise<Player[]> {
  const { data } = await http.get<Player[]>("/players", { params: { teamId } });
  return Array.isArray(data) ? data : [];
}
export async function createPlayer(
  payload: Omit<Player, "id">,
): Promise<Player> {
  const { data } = await http.post<Player>("/players", payload);
  return data;
}
