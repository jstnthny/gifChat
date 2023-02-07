import {auth, provider} from "../firebase-config.js";
import {signInWithPopup} from "firebase/auth";

// Cookies module
import Cookies from 'universal-cookie'
// Get, set and remove cookies from browser
const cookies = new Cookies()

export const Auth = (props) => {
    // destructure the prop
    const {setIsAuth} = props;

    const signInWithGoogle = async () =>{
        // Try & Catch
        try{
            const result =  await signInWithPopup(auth, provider);
            // set cookies into browser, setting refresh token to represent user
            // storing refreshToken as a cookie when user signs in called "auth-token"
            cookies.set("auth-token", result.user.refreshToken);
            // setIsAuth to true after authentication
            setIsAuth(true);

            // If there is an error console.log it
        } catch(err){
            console.log(err);
        }
    };

    return (
    <div className="auth">
        <p>Sign In With Google To Continue</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
)}