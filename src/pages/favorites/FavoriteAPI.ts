import Team from "../../models/Team";

export async function searchFavorites( userId: string) {
  const url = import.meta.env.VITE_PIZARRA_API + "favorite/" + userId;

  const response = await fetch(url, {
    mode: "cors",
    headers:{
        "Access-Control-Allow-Origin": "*"
    }
});
  return await response.json();
}

export function removeTeam() {}

export async function saveFavorite(teamId: string, userId: string) {
  const url = import.meta.env.VITE_PIZARRA_API + "favorite";

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({"teamId": teamId, "userId": userId}),
    headers:{
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
    }
  });
  return await response.json();
}

export async function deleteFavorite(teamId: string, userId: string) {
  const url = import.meta.env.VITE_PIZARRA_API + "favorite/" + teamId + "/" + userId;

  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers:{
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
    }
  });
  return await response.json();
}

export async function searchTeams() {
  const url = import.meta.env.VITE_PIZARRA_API + "teams";

  const response = await fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
}
