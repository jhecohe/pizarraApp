
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

export async function scanPremier() {
  const url = import.meta.env.VITE_PIZARRA_API + "scan/premier";

  const response = await fetch(url, {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
}

export async function deletePremier() {
  const url = import.meta.env.VITE_PIZARRA_API + "teams/premier";

  const response = await fetch(url, {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
}
