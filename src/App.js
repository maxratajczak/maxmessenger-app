import './App.css';
import SideBar from './components/SideBar';
import ChatRoom from './components/ChatRoom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import firebase from 'firebase/compat/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


firebase.initializeApp({
  apiKey: "AIzaSyAc__zFLxBocTL7Hy3wKcaR9MB31O3OhBc",
  authDomain: "maxmessenger-app-1e71b.firebaseapp.com",
  projectId: "maxmessenger-app-1e71b",
  storageBucket: "maxmessenger-app-1e71b.appspot.com",
  messagingSenderId: "756212895147",
  appId: "1:756212895147:web:2aebd85fb7b256f62256ee",
  measurementId: "G-D6BF9374L5"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/">
            <SideBar
            firebase={firebase}
            auth={auth}
            firestore={firestore}
            user={user}
            />
            <ChatRoom
              name="General Chat"
              firebase={firebase}
              auth={auth}
              firestore={firestore}
              user={user}
            />
          </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
