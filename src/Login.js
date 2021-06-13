import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import { auth, provider } from './Firebase'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider';

const Login = () => {
        const [{}, dispatch] = useStateValue();
    
        const signIn = () => {
       auth
       .signInWithPopup(provider)
       .then((result) => {
           dispatch({
               type: actionTypes.SET_USER,
               user: result.user,
           });
       })
       .catch((err)=> alert(err.message));
    };
    
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://tse2.mm.bing.net/th?id=OIP.Nf-m41NGgoClnltGcriroAHaHl&pid=Api&P=0&w=300&h=300" alt="" />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
