import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import "./PremierList.css";
import { trophy } from "ionicons/icons";
import { useEffect, useState } from "react";
import { searchTeams } from "./PremierAPI";
import { deleteFavorite, saveFavorite, searchFavorites } from "../favorites/FavoriteAPI";
import Team from "../../models/Team";
import ITeamsFavoritesByUser from "../../models/TeamsFavoritesByUser";
import { getUsers } from "../user/UserAPI";
import User from "../../models/User";

const PremierList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const history = useHistory();
  const [favoriteList, setFavoriteList] = useState<ITeamsFavoritesByUser[]>([]);
  let userId = "";

  useEffect(() => {
    search();
    getUser();
    loadFavorites();
  }, [inFavorites(), history.location.pathname]);

  const search = async () => {
    let result: Team[] = await searchTeams();
    setTeams(result);
  };

  const getUser = async () => {
    let user: User[] = await getUsers();
    setUsers(user);
  }

  const loadFavorites = async () => {
    console.log("User    ", userId)
    let result: ITeamsFavoritesByUser[] = await searchFavorites(users[0].id);
    setFavoriteList(result);
    inFavorites();
  };

  const addToFavorites = async (team: Team) => {
    if (!favoriteList.find((fav) => fav.teamId === team.id)) {
      const favorites: ITeamsFavoritesByUser[] = await saveFavorite(team.id, users[0].id);
      setFavoriteList(favorites.filter((fav) => fav.team[0].league === "premier")); 
    } else {
      const favorites: ITeamsFavoritesByUser[] = await deleteFavorite(team.id, users[0].id);
      setFavoriteList(favorites.filter((fav) => fav.team[0].league === "premier"));
    }
    inFavorites();
  };

  function inFavorites(): void {
    const fav = teams.map((team) => {
      team.check = false;
      const res = favoriteList.some((fav) => fav.team[0].id === team.id);
      if (res) {
        team.check = true;
      }
      return team;
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Premier League</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle>Season 2023 - 2024</IonTitle>
          <IonGrid className="teamTable">
            <IonRow>
              <IonCol>Position</IonCol>
              <IonCol>Team</IonCol>
              <IonCol>M. Played</IonCol>
              <IonCol>M. Won</IonCol>
              <IonCol>Points</IonCol>
              <IonCol>Favorite</IonCol>
            </IonRow>
            {teams.map((team: Team) => (
              <IonRow key={team.key}>
                <IonCol>{team.position}</IonCol>
                <IonCol>{team.name}</IonCol>
                <IonCol>{team.mPlayed}</IonCol>
                <IonCol>{team.mWons}</IonCol>
                <IonCol>{team.points}</IonCol>
                <IonCol>
                  <IonButton
                    color={team.check ? "danger" : "light"}
                    size="small"
                    fill="clear"
                    onClick={() => addToFavorites(team)}
                  >
                    <IonIcon icon={trophy} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PremierList;
