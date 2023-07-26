import Team from "../../models/Team";

export async function searchTeams() {
  const url = import.meta.env.VITE_PIZARRA_API + "teams/serieA";

  const response = await fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
}

export async function scanSerieA() {
  const url = import.meta.env.VITE_PIZARRA_API + "scan/serieA";

  const response = await fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
}

export async function deleteSerieA() {
  const url = import.meta.env.VITE_PIZARRA_API + "teams/serieA";

  const response = await fetch(url, {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
}
