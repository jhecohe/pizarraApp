import useFetch from "../../hooks/useFetch";
import Team from "../../models/Team";

export function searchTeams() {
  // const url = process.env.PIZARRA_API + "teams/premier";

  // const response = useFetch<Team[]>(url);
  // return response.data;
}

export function removeTeam() {}

export function saveTeam() {}

// export async function favoriteTeam(id: string) {
//   let teams = await searchTeams();
//   const index = teams.findIndex((team: Team) => team.id == id);
//   teams[index].check = !teams[index].check;
//   localStorage["teams"] = JSON.stringify(teams);
//   searchTeams();
// }
