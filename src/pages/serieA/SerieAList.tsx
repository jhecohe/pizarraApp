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
import "./SerieAList.css";
import { trophy } from "ionicons/icons";
import { useEffect, useState } from "react";
import { searchTeams } from "./TeamAPI";
import { removeFavorite, saveFavorite } from "../favorites/Favorites";
import Team from "../../models/Team";
import useFetch from "../../hooks/useFetch";
import useFetchPost from "../../hooks/useFetchPost";

interface favoriteReq {
  idTeam: String;
  idLeague: String;
}

export default function SerieAList() {
  const { name } = useParams<{ name: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [favorites, setFavorites] = useState<String[]>([]);
  const [listFavorites, setListFavorites] = useState<Team[]>([]);

  const url = import.meta.env.VITE_PIZARRA_API + "teams/serieA";
  const urlSave = import.meta.env.VITE_PIZARRA_API + "favorite";

  const response = useFetch<Team[]>(url);
  const payload: favoriteReq = {"idTeam":"ARS", "idLeague":"Premier"}
  const favoriteList = useFetchPost<Team[], favoriteReq>(urlSave, payload);

  useEffect(() => {
    if (response.state === "success") {
      setTeams(response.data!);
    }
  }, [response]);

  useEffect(() => {
    if (favoriteList.state === "success") {
      setListFavorites(favoriteList.data!);
    }
  }, [favorites]);

  if (response.state === "loading") {
    return <div>Loading...</div>;
  }

  if (response.state === "error") {
    return <div>Error: {response.error}</div>;
  }

  function addToFavorites (team: Team) {
    setFavorites([...favorites, team.id]);
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
              <IonRow>
                <IonCol id={team.id}>{team.position}</IonCol>
                <IonCol>{team.name}</IonCol>
                <IonCol>{team.mPlayed}</IonCol>
                <IonCol>{team.mWons}</IonCol>
                <IonCol>{team.points}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => addToFavorites(team)}
                    color={favorites.includes(team.id) ? "danger" : "light"}
                    size="small"
                    fill="clear"
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
}
