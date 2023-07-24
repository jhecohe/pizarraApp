import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import "../premier/PremierList.css";
import { useEffect, useState } from "react";
import Team from "../../models/Team";
import { scanPremier } from "../premier/PremierAPI";
import { scanSerieA } from "../serieA/SerieAAPI";
import User from "../../models/User";
import { getUsers } from "../user/UserAPI";

const Administration: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const [updateP, setUpdateP] = useState<string>("unknow");
  const [updateA, setUpdateA] = useState<string>("unknow");

  useEffect(() => {
    getUser();
  }, [history.location.pathname]);

  const getUser = async () => {
    let user: User[] = await getUsers();
  };

  const loadPremier = async () => {
    let result: Team[] = await scanPremier();
    if (result.length > 1) {
      setUpdateP(new Date().toLocaleString());
      disableButtomP();
    }
  };

  const loadSerieA = async () => {
    let result: Team[] = await scanSerieA();
    if (result.length > 1) {
      setUpdateA(new Date().toLocaleString());
    }
  };

  function disableButtomP(): boolean {
    if (updateP != "unknow") {
      const current = new Date();
      const last = new Date(updateA);
      const lapse = current.getMinutes() - last.getMinutes();
      if (Math.abs(lapse) > 10) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  function disableButtomA(): boolean {
    if (updateA != "unknow") {
      const current = new Date();
      const last = new Date(updateA);
      const lapse = current.getMinutes() - last.getMinutes();
      if (Math.abs(lapse) > 10) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Premier League</IonCardTitle>
            <IonCardSubtitle>Last update: {updateP}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Request for a new update of data "It can update every 10 min"
          </IonCardContent>

          <IonButton
            fill="clear"
            onClick={() => loadPremier()}
            disabled={disableButtomP()}
          >
            Update
          </IonButton>
          <IonButton fill="clear">Clear</IonButton>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Serie A League</IonCardTitle>
            <IonCardSubtitle>Last update: {updateA}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Request for a new update of data: It can update every 10 min
          </IonCardContent>

          <IonButton
            fill="clear"
            onClick={() => loadSerieA()}
            disabled={disableButtomA()}
          >
            Update
          </IonButton>
          <IonButton fill="clear">Clear</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Administration;
