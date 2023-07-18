export const get = async function fetchData(url: string) {
  let response = null;
  try {
    response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    throw new Error("Somthing wrong with the GET request to: " + url);
  }
  return response.json();
};

export const post = async function fetchData(url: string, body: any) {
  let response = null;
  try {
    response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
    });
  } catch (error) {
    throw new Error("Somthing wrong with the POST request to: " + url);
  }
  return response.json();
};
