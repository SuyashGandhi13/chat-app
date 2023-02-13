import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import "./App.css";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const fireApp = initializeApp(firebaseConfig);
const auth = getAuth(fireApp);
const db = getFirestore(fireApp);

function App() {
  const [user] = useAuthState(auth);

  return (
    <Layout loggedIn={user ? true : false} auth={auth}>
      {user ? <HomePage firestore={db} auth={auth} /> : <LoginPage />}
    </Layout>
  );
}

export default App;
