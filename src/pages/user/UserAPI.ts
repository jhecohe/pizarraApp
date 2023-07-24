export async function getUsers() {
    const url = import.meta.env.VITE_PIZARRA_API + "users";
  
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    return await response.json();
  }