import Team from "./Team";

export function searchTeams() {
  if (!localStorage["teams"]) {
    const datosDeEjemplo = [
      {
        id: "ARS",
        name: "Arsenal",
        position: "1",
        points: "69",
        mPlayed: "28",
        mWons: "22",
        mDrawn: "3",
        mLosts: "3",
        gF: "66",
        gA: "26",
        gD: "+40",
        nextMatchs: null,
        image: null,
        check: false,
        _links: {
          self: {
            href: "http://localhost:9000/api/teams/ARS",
          },
          team: {
            href: "http://localhost:9000/api/teams/ARS",
          },
        },
      },
      {
        id: "MCI",
        name: "Manchester City",
        position: "2",
        points: "61",
        mPlayed: "27",
        mWons: "19",
        mDrawn: "4",
        mLosts: "4",
        gF: "67",
        gA: "25",
        gD: "+42",
        nextMatchs: null,
        image: null,
        check: false,
        _links: {
          self: {
            href: "http://localhost:9000/api/teams/MCI",
          },
          team: {
            href: "http://localhost:9000/api/teams/MCI",
          },
        },
      },
      {
        id: "MUN",
        name: "Manchester United",
        position: "3",
        points: "50",
        mPlayed: "26",
        mWons: "15",
        mDrawn: "5",
        mLosts: "6",
        gF: "41",
        gA: "35",
        gD: "+6",
        nextMatchs: null,
        image: null,
        check: false,
        _links: {
          self: {
            href: "http://localhost:9000/api/teams/MUN",
          },
          team: {
            href: "http://localhost:9000/api/teams/MUN",
          },
        },
      },
      {
        id: "TOT",
        name: "Tottenham Hotspur",
        position: "4",
        points: "49",
        mPlayed: "28",
        mWons: "15",
        mDrawn: "4",
        mLosts: "9",
        gF: "52",
        gA: "40",
        gD: "+12",
        nextMatchs: null,
        image: null,
        favorite: false,
        _links: {
          self: {
            href: "http://localhost:9000/api/teams/TOT",
          },
          team: {
            href: "http://localhost:9000/api/teams/TOT",
          },
        },
      },
      {
        id: "NEW",
        name: "Newcastle United",
        position: "5",
        points: "47",
        mPlayed: "26",
        mWons: "12",
        mDrawn: "11",
        mLosts: "3",
        gF: "39",
        gA: "19",
        gD: "+20",
        nextMatchs: null,
        image: null,
        check: false,
        _links: {
          self: {
            href: "http://localhost:9000/api/teams/NEW",
          },
          team: {
            href: "http://localhost:9000/api/teams/NEW",
          },
        },
      },
    ];
    localStorage["teams"] = JSON.stringify(datosDeEjemplo);
  }

  let teams = localStorage["teams"];
  teams = JSON.parse(teams);
  return teams;
}

export function removeTeam() {}

export function saveTeam() {}

export function favoriteTeam(id: string) {
  let teams = searchTeams();
  const index = teams.findIndex((team: Team) => team.id == id);
  teams[index].check = !teams[index].check;
  localStorage["teams"] = JSON.stringify(teams);
  searchTeams();
}
