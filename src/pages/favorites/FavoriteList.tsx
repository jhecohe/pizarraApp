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
  import "../premier/PremierList.css";
  import { close } from "ionicons/icons";
  import { useEffect, useState } from "react";
  import { getTeamsFavorites, removeFavorite } from "./Favorites";
  
  const FavoriteList: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [favorites, setFavorites] = useState<any>([]);
  
    useEffect(() => {
      search();
    }, [favorites]);
  
    const search = () => {
      let result = getTeamsFavorites();
      setFavorites(result);
    };
  
    const removeFavorites = (team: any) => {
        removeFavorite(team.id)
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
              {favorites.map((team:any) => (
                <IonRow>
                  <IonCol>{team.position}</IonCol>
                  <IonCol>{team.name}</IonCol>
                  <IonCol>{team.mPlayed}</IonCol>
                  <IonCol>{team.mWons}</IonCol>
                  <IonCol>{team.points}</IonCol>
                  <IonCol>
                    <IonButton color="danger" size="small" fill="clear" 
                    onClick={() => removeFavorites(team)}>
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
  