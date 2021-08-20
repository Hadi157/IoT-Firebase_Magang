import firebase from "firebase/app";
/**
 * Firebase Authentication
 * {@link https://firebase.google.com/docs/auth| Documentation}
 */
import "firebase/auth";
/**
 * Firebase Firestore
 * {@link https://firebase.google.com/docs/firestore| Documentation}
 */
import "firebase/firestore";
import "firebase/database"

const appInitFirebase = () => {
    let firebaseConfig = {
        apiKey: "AAAAD8lDpL0:GV9Jm2u7rmsCe65wKzPTw5jtS38n2tVEGi8_D47Fpo1-w-4E047an-eGV9Jm2u7rmsCe65wKzPTw5jtS38n2tVEGiDtbLrcW77HPEwrJM2Ej2yFNYwVrUxdeTc-gosi9QrAALCUORKdj",
        authDomain: "project-iot-pi.firebaseapp.com",
        projectId: "project-iot-pi",
        storageBucket: "project-iot-pi.appspot.com",
        databaseURL: "https://project-iot-pi-default-rtdb.firebaseio.com/",
    };
    let webinarYESApps = firebase.initializeApp(firebaseConfig);
    return webinarYESApps;
};
appInitFirebase();

const firestoreGet = async (collection, limit, filter = "") => {
    console.log(`Requesting ${JSON.stringify(filter)} of ${limit}`);
    let db = firebase.firestore();
    if (Object.keys(filter)[0] === "populer") {
        return await db.collection(collection).where("date", ">", new Date().getTime()).orderBy("date", "desc").orderBy("view", "desc").limit(limit).get();
    } else {
        return false;
    } 
};

const writeData = async (data) => {
    firebase.database().ref('Hadi/').set({
      Relay: data
    });
}

const getData = async () => {
    let dataDoc = firebase.database().ref('Hadi/Relay');
    let data;
    dataDoc.on('value', (snapshot) => {
      data = snapshot.val();
      console.log(data)
    });
    return data;
}

export { getData, writeData };
