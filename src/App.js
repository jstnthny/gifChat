import React, {useState, useRef} from "react";
import { Auth } from "./components/Auth";
import Chat from "./components/Chat"
// Cookies module
import Cookies from 'universal-cookie'
import {signOut} from "firebase/auth";
import {auth} from "./firebase-config"
// Get, set and remove cookies from browser
const cookies = new Cookies()

function App() {
  // If there is a "auth-token" isAuth will be set to true and vice versa
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null);

  // useRef to store value and not cause a re-render
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }


  // If statement to check if auth is set
  if(!isAuth) {
    return (
      <div className="App">
        {/* Pass setIsAuth as a prop to set it to true after we authenticate */}
        <div><Auth setIsAuth={setIsAuth} /></div>
      </div>
    );

  }

  return <>{
          room ? <Chat room={room}/> : 
                <div className="room">
                  <label>Enter Room Name:</label>
                  <input ref={roomInputRef}/>
                  <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
                </div>
              }
              <div className="sign-out">
                <button onClick={signUserOut}>Sign Out</button>
              </div>
         </>

}

export default App;
