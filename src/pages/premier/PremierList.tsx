import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import "./PremierList.css";
import { trophy } from "ionicons/icons";
import { useEffect, useState } from "react";
import { searchTeams } from "./PremierAPI";
import { deleteFavorite, saveFavorite, searchFavorites } from "../favorites/FavoriteAPI";
import Team from "../../models/Team";
import ITeamsFavoritesByUser from "../../models/TeamsFavoritesByUser";

const PremierList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [favoriteList, setFavoriteList] = useState<ITeamsFavoritesByUser[]>([]);

  useEffect(() => {
    search();
    loadFavorites();
  }, [inFavorites()]);

  const search = async () => {
    let result: Team[] = await searchTeams();
    setTeams(result);
  };

  const loadFavorites = async () => {
    let result: ITeamsFavoritesByUser[] = await searchFavorites("64b88f370a4f88dae3d2f07e");
    setFavoriteList(result);
    inFavorites();
  };

  const addToFavorites = async (team: Team) => {
    if (!favoriteList.find((fav) => fav.teamId === team.id)) {
      const favorites: ITeamsFavoritesByUser[] = await saveFavorite(team.id, "64b88f370a4f88dae3d2f07e");
      setFavoriteList(favorites.filter((fav) => fav.team[0].league === "premier")); 
    } else {
      const favorites: ITeamsFavoritesByUser[] = await deleteFavorite(team.id, "64b88f370a4f88dae3d2f07e");
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
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle>Premier League</IonTitle>
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
              <IonRow key={team.id}>
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
