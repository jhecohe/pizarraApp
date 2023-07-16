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
import { searchTeams } from "./TeamAPI";
import { removeFavorite, saveFavorite } from "../favorites/Favorites";
import Team from "../../models/Team";

const PremierList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [teams, setTeams] = useState<Team[]>([]);

  const check = true;

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    let result = await searchTeams();
    setTeams(result);
  };

  // const addToFavorites = (team: Team) => {
  //   if(team.check){
  //     removeFavorite(team.id)

  //   } else {
  //     saveFavorite(team.id);
  //   }
  // }

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
              <IonRow>
                <IonCol>{team.position}</IonCol>
                <IonCol>{team.name}</IonCol>
                <IonCol>{team.mPlayed}</IonCol>
                <IonCol>{team.mWons}</IonCol>
                <IonCol>{team.points}</IonCol>
                <IonCol>
                  <IonButton color={check ? 'danger':'light'} size="small" fill="clear" >
                  {/* onClick={() => addToFavorites(team)}> */}
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
