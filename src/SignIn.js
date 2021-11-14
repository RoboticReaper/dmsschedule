import { Container, Typography, Button } from "@material-ui/core";
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import { TextField } from "@material-ui/core";
import firebase from "firebase";
import "firebase/auth";
import { React, useState } from "react";
import ResetDialog from './ResetDialog';
import { useHistory } from "react-router";


function SignIn() {
    let history = useHistory();
    const [pswdError, setPswdError] = useState(false);


    function signIn() {
        const email = document.getElementById('email').value;
        const pswd = document.getElementById('pswd').value;

        if (pswd === '') {
            alert("Password can't be empty");
            setPswdError(true);
            return;
        } else {
            setPswdError(false);
        }
        // pswd and email have no problem
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            firebase.auth().signInWithEmailAndPassword(email, pswd).then((userCredential) => {
                var user = userCredential.user;
                if ((!user.emailVerified) && window.location.pathname === '/signin') {
                    firebase.auth().currentUser.sendEmailVerification().then(() => {
                        console.log("Email Sent");
                        alert('An email was sent to you to verify your account. Please verify before logging in.');
                    })
                    firebase.auth().signOut().then(() => {
                        localStorage.clear()
                    }).catch((error) => {
                        console.log(error);
                    })
                }
                else {
                    localStorage.setItem('uid', user.uid);
                    history.push("/");
                }
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted.") {
                    errorMessage = "No user with this email exists";
                }
                if (errorMessage === "The password is invalid or the user does not have a password.") {
                    errorMessage = "Wrong password";
                }
                if (errorCode === "auth/too-many-requests"){
                    errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
                }
                console.log(errorCode);
                console.log(errorMessage);
                alert(errorMessage);
            })
        })

    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if ((window.location.pathname === "/signin" || window.location.pathname === "/signup") && user.emailVerified) {
                history.push('/')
            }
        } else {
            localStorage.clear()
            if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
                history.push('/signin')
            }
        }
    })

    function toSignUp() {
        history.push('/signup')
    }

    return (
        <div className="App">
            <header className='App-header'>
            </header>
            <Container maxWidth="sm">
                <div className="classes.root">
                    <LockRoundedIcon fontSize="large" color="secondary" style={{ marginTop: 30 }} />
                    <Typography gutterBottom variant="h4">Sign In</Typography>
                    <TextField id="email" variant="outlined" type="email" label="Email" autoFocus fullWidth margin="normal"/>
                    <TextField id="pswd" variant="outlined" type="password" label="Password" fullWidth margin="normal" error={pswdError} />
                    <Button variant="contained" color="secondary" fullWidth margin="normal" onClick={signIn} style={{ marginTop: 20, marginBottom: 20 }}>Sign in</Button>
                    <Button color="secondary" style={{ textTransform: "none" }} onClick={toSignUp}>Don't have an account? Sign up</Button><br></br>
                    <ResetDialog />
                </div>
            </Container>
        </div>
    )
}
export default SignIn;