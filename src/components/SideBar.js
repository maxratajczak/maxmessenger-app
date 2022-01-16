import "../css/SideBar.css"
import logo from '../logo.png'

const SideBar = ({firebase, auth, user}) => {
    return ( 
        <div className="sidebar-content">
          <div className="header">
            <img className="logo" src={logo} alt="" />
            <div>
              <h1 className="nav-title">MaxMessenger</h1>
              <p className="subHeading">It's like Facebook Messenger, but worse</p>
            </div>
          </div>
          <div className="user-info">
            {user ? 
            <div className="container">
              <div className="user">
                <h3>Signed in as:</h3>
                <div className="user-box">
                  <img src={user.photoURL} alt="" />
                  <h4>{user.displayName}</h4>
                </div>
              </div>
              <div className="login-out">
                <SignOut
                  firebase={firebase}
                  auth={auth}
                  user={user}
                  />
              </div>
              
              
            </div>
            :
            <div className="container">
              <h3>Sign in with Google</h3>
              <SignIn
                firebase={firebase}
                auth={auth}
                user={user}
                />
            </div>
            }
          </div>
        </div>
     );
}

function SignIn({firebase, auth, user}) {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
    return (
      <button className="account-button" onClick={signInWithGoogle}>Sign In</button>
    )
  }

function SignOut({firebase, auth, firestore, user}) {
    return auth.currentUser && (
      <button className="account-button" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }
 
export default SideBar;