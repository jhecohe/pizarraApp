import Team from "./Team";

export default interface ITeamsFavoritesByUser
{
    id: string;
	teamId: string;
	userId: string;
    team: Team[];
}