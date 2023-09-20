import {GoogleAuthProvider, RecaptchaVerifier, signInWithPopup} from 'firebase/auth'
import {auth} from '../firbase/firebase' 
function setUpRecaptcha(number){
    const recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {},
        auth
    )
    recaptchaVerifier.render()
}