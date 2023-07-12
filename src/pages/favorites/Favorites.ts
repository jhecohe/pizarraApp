import Team from "../team/Team";
import { favoriteTeam, searchTeams } from "../team/TeamAPI";

export function searchFavorites() {
    if (!localStorage['favorites']) {
        localStorage['favorites'] = '[]'
    }
    let favorites = localStorage['favorites'];
    favorites = JSON.parse(favorites);
    return favorites;
}

export function getTeamsFavorites() {
    let teams = searchTeams();
    let favorities = searchFavorites();
    const favoritiesList = teams.filter( (team: Team) => favorities.includes(team.id));
    return favoritiesList;
}

export function removeFavorite(idTeam: string) {
    let favorites = searchFavorites();
    favoriteTeam(idTeam);
    const index = favorites.findIndex( (id: string) => id === idTeam);
    favorites.splice(index, 1);
    localStorage['favorites'] = JSON.stringify(favorites);
}

export function saveFavorite(id: string) {
    let favorites = searchFavorites();
    favoriteTeam(id);
    favorites.push(id);
    localStorage['favorites'] = JSON.stringify(favorites);
}