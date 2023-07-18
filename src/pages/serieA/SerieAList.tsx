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
import "./SerieAList.css";
import { trophy } from "ionicons/icons";
import { useEffect, useState } from "react";
import { searchTeams } from "./TeamAPI";
import { removeFavorite } from "../favorites/Favorites";
import Team from "../../models/Team";
import useFetch, { UseFetchReturn } from "../../hooks/useFetch";
import useFetchPost from "../../hooks/useFetchPost";

interface favoriteReq {
  idTeam: String;
  idLeague: String;
}

const url = import.meta.env.VITE_PIZARRA_API + "teams/serieA";
const urlSave = import.meta.env.VITE_PIZARRA_API + "favorite";

function getTeams(): UseFetchReturn<Team> {
  return useFetch<Team>({
    url: url,
    method: "GET",
  });
}

function saveFavorite(idTeam: String, idLeague: string): UseFetchReturn<favoriteReq> {
  return useFetch<favoriteReq>({
    url: urlSave,
    method: "POST",
    body:{IdTeam: idTeam, IdLeague: idLeague}
  });
}

function SerieAList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [listFavorites, setListFavorites] = useState<Team[]>();

  const { data: teamList, state: teamReqStatus, error: error } = getTeams();

  useEffect(() => {
    if (teamReqStatus === "success") {
      setTeams(teamList!);
    }
  }, [teamList]);

  // useEffect(() => {
  //   setListFavorites([]);
  // }, []);

  if (teamReqStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (teamReqStatus === "error") {
    return <div>Error: {error}</div>;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Serie A</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Serie A</IonTitle>
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
              <IonRow key={team.id}>
                <IonCol id={team.id}>{team.position}</IonCol>
                <IonCol>{team.name}</IonCol>
                <IonCol>{team.mPlayed}</IonCol>
                <IonCol>{team.mWons}</IonCol>
                <IonCol>{team.points}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => saveFavorite(team.id, team.league)}
                    // color={favorites.includes(team.id) ? "danger" : "light"}
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

export default SerieAList;
