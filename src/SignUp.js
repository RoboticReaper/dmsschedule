import { Container, Typography, Button } from "@material-ui/core";
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import { TextField } from "@material-ui/core";
import firestore from "./firestore.js";
import firebase from "firebase";
import "firebase/auth";
import { React, useState } from "react";
import { useHistory } from "react-router";


function SignUp() {
    let history = useHistory();


    const [emailError, setEmailError] = useState(false);
    const [pswdError, setPswdError] = useState(false);


    function signUp() {
        const email = document.getElementById('email').value;
        const pswd = document.getElementById('pswd').value;

        if (email === "") {
            setEmailError(true);
            alert("Please enter your email address");
            return;
        } else {
            setEmailError(false);
        }
        if (pswd === '') {
            alert("Password can't be empty");
            setPswdError(true);
            return;
        } else {
            setPswdError(false);
        }
        // pswd and email have no problem
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            firebase.auth().createUserWithEmailAndPassword(email, pswd).then((userCredential) => {
                firebase.auth().currentUser.sendEmailVerification().then(() => {
                    console.log("Email Sent");
                    alert('An email was sent to you to verify your account. Please verify before logging in.');
                })
                firestore.db.collection('users').doc(userCredential.user.uid).set({ "classes": JSON.stringify([]) }, (error) => {
                    firebase.auth().signOut().then(() => {
                        localStorage.clear()
                        history.push('signin')
                    }).catch((error) => {
                        console.log(error);
                    })
                });
                history.push('/signin')
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                if (errorCode === "auth/email-already-in-use") {
                    errorMessage = "Account already exists";
                }
                if (errorCode === "auth/too-many-requests"){
                    errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
                }
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

    function toSignIn() {
        history.push("/signin")
    }

    return (
        <div className="App">
            <header className='App-header'>
            </header>
            <Container maxWidth="sm">
                <div className="classes.root">
                    <LockRoundedIcon fontSize="large" color="secondary" style={{ marginTop: 30 }} />
                    <Typography gutterBottom variant="h4">Sign Up</Typography>
                    <TextField id="email" variant="outlined" type="email" label="Email" autoFocus fullWidth margin="normal" error={emailError} />
                    <TextField id="pswd" variant="outlined" type="password" label="Password" fullWidth margin="normal" error={pswdError} />
                    <Button variant="contained" color="secondary" fullWidth margin="normal" onClick={signUp} style={{ marginTop: 20, marginBottom: 20 }}>Sign up</Button>
                    <Button color="secondary" style={{ textTransform: "none" }} onClick={toSignIn}>Already have an account? Sign in</Button>

                </div>
            </Container>
        </div>
    )
}
export default SignUp;