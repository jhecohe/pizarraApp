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
import "../premier/PremierList.css";
import { close } from "ionicons/icons";
import { useEffect, useState } from "react";
import ITeamsFavoritesByUser from "../../models/TeamsFavoritesByUser";
import { deleteFavorite, searchFavorites } from "./FavoriteAPI";

const FavoriteList: React.FC = () => {
  const url = import.meta.env.VITE_PIZARRA_API + "favorite";

  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const [teamsFavarites, setTeamsFavarites] = useState<ITeamsFavoritesByUser[]>([]);

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result: ITeamsFavoritesByUser[] = await searchFavorites("64b88f370a4f88dae3d2f07e");
    setTeamsFavarites(result);
  };

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
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Favorites</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonTitle>Temporada 2023 -2024</IonTitle>
          <IonGrid className="teamTable">
            <IonRow>
              <IonCol>Position</IonCol>
              <IonCol>Team</IonCol>
              <IonCol>M. Played</IonCol>
              <IonCol>M. Won</IonCol>
              <IonCol>Points</IonCol>
              <IonCol>Remove</IonCol>
            </IonRow>
            {teamsFavarites.map((team: ITeamsFavoritesByUser) => (
              <IonRow key={team.id}>
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
