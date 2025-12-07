import { http } from "./http";
import type { Team } from "../types";

export async function getTeams(): Promise<Team[]> {
  const { data } = await http.get<Team[]>("/teams");
  return data;
}

export async function getTeamById(id: string | number): Promise<Team> {
  const { data } = await http.get<Team>(`/teams/${id}`);
  return data;
}

export async function createTeam(payload: Omit<Team, "id">): Promise<Team> {
  const { data } = await http.post<Team>("/teams", payload);
  return data;
}

export async function deleteTeam(id: string | number): Promise<void> {
  await http.delete(`/teams/${id}`);
}
