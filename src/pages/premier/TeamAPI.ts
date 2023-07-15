import Team from "../../models/Team";

export async function searchTeams() {
  // const url = process.env.PIZARRA_API + "teams/premier";
  const url = import.meta.env.VITE_PIZARRA_API + "teams/premier";

  const response = await fetch(url, {
    mode: "cors",
    headers:{
        "Access-Control-Allow-Origin": "*"
    }
});
  return await response.json();
}

export function removeTeam() {}

export function saveTeam() {}

export async function favoriteTeam(id: string) {
  let teams = await searchTeams();
  const index = teams.findIndex((team: Team) => team.id == id);
  teams[index].check = !teams[index].check;
  localStorage["teams"] = JSON.stringify(teams);
  searchTeams();
}
