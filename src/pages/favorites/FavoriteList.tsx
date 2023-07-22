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
import { useParams } from "react-router";
import "../premier/PremierList.css";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";
import { deleteFavorite, searchFavorites, searchTeams } from "./FavoriteAPI";
import Team from "../../models/Team";
import ITeamsFavoritesByUser from "../../models/TeamsFavoritesByUser";

const FavoriteList: React.FC = () => {
  const url = import.meta.env.VITE_PIZARRA_API + "favorite";

  const { name } = useParams<{ name: string }>();
  const [favorites, setFavorites] = useState<ITeamsFavoritesByUser[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsFavarites, setTeamsFavarites] = useState<ITeamsFavoritesByUser[]>([]);

  useEffect(() => {
    search();
    // getFavorites();
    // loadTeams();
  }, []);

  const search = async () => {
    let result: ITeamsFavoritesByUser[] = await searchFavorites("64b88f370a4f88dae3d2f07e");
    setTeamsFavarites(result);
  };

  // const loadTeams = async () => {
  //   let result: Team[] = await searchTeams();
  //   setTeams(result);
  // };

  // function getFavorites(): void {
  //   console.log("getFavorites");
  //   const fav = teams.filter((team) => {
  //     favorites.some((fav) => fav.teamId === team.id);
  //   });
  //   console.log("fav  ", fav);
  //   setTeamsFavarites(fav);
  // }

  const removeFavorites = async (team: ITeamsFavoritesByUser) => {
    const favorites: ITeamsFavoritesByUser[] = await deleteFavorite(team.teamId, "64b88f370a4f88dae3d2f07e");
    setTeamsFavarites(favorites);
  };

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
            {teamsFavarites.map((team: ITeamsFavoritesByUser) => (
              <IonRow>
                <IonCol>{team.team[0].position}</IonCol>
                <IonCol>{team.team[0].name}</IonCol>
                <IonCol>{team.team[0].mPlayed}</IonCol>
                <IonCol>{team.team[0].mWons}</IonCol>
                <IonCol>{team.team[0].points}</IonCol>
                <IonCol>
                  <IonButton
                    color="danger"
                    size="small"
                    fill="clear"
                    onClick={() => removeFavorites(team)}
                  >
                    <IonIcon icon={close} slot="icon-only" />
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

export default FavoriteList;
