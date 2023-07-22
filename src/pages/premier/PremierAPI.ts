import Team from "../../models/Team";

export async function searchTeams() {
  const url = import.meta.env.VITE_PIZARRA_API + "teams/premier";

  const response = await fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
}
