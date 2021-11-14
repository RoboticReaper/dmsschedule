import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid } from "@material-ui/core";
import ClassDialog from './ClassDialog.js';
import { Paper } from "@material-ui/core";
import firestore from "./firestore.js"
import { Box } from "@material-ui/core";
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "firebase";
import List from '@mui/material/List';
import EventIcon from '@mui/icons-material/Event';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        flexGrow: 1,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        maxWidth: 500,
    },
}));



function Classes() {

    const classes = useStyles();
    let history = useHistory();


    const [createdClasses, setClasses] = useState(JSON.parse(localStorage.getItem('createdClasses')));
    const [createdClasses2, setClasses2] = useState(JSON.parse(localStorage.getItem('createdClasses2')));
    const [createdClasses3, setClasses3] = useState(JSON.parse(localStorage.getItem('createdClasses3')));
    const [createdClasses4, setClasses4] = useState(JSON.parse(localStorage.getItem('createdClasses4')));
    const [createdClasses5, setClasses5] = useState(JSON.parse(localStorage.getItem('createdClasses5')));
    const [createdClasses6, setClasses6] = useState(JSON.parse(localStorage.getItem('createdClasses6')));

    const [open, setOpen] = React.useState([false]);
    const [open2, setOpen2] = React.useState([false]);
    const [open3, setOpen3] = React.useState([false]);
    const [open4, setOpen4] = React.useState([false]);
    const [open5, setOpen5] = React.useState([false]);
    const [open6, setOpen6] = React.useState([false]);

    const handleClickOpen = (index) => {
        var newArr = open;
        open[index] = true;
        setOpen(newArr.slice());
    };

    const handleClose = (index) => {
        var newArr = open;
        open[index] = false;
        setOpen(newArr.slice());
    };

    const handleClickOpen2 = (index) => {
        var newArr = open2;
        open2[index] = true;
        setOpen2(newArr.slice());
    };

    const handleClose2 = (index) => {
        var newArr = open2;
        open2[index] = false;
        setOpen2(newArr.slice());
    };
    const handleClickOpen3 = (index) => {
        var newArr = open3;
        open3[index] = true;
        setOpen3(newArr.slice());
    };

    const handleClose3 = (index) => {
        var newArr = open3;
        open3[index] = false;
        setOpen3(newArr.slice());
    };
    const handleClickOpen4 = (index) => {
        var newArr = open4;
        open4[index] = true;
        setOpen4(newArr.slice());
    };

    const handleClose4 = (index) => {
        var newArr = open4;
        open4[index] = false;
        setOpen4(newArr.slice());
    };
    const handleClickOpen5 = (index) => {
        var newArr = open5;
        open5[index] = true;
        setOpen5(newArr.slice());
    };

    const handleClose5 = (index) => {
        var newArr = open5;
        open5[index] = false;
        setOpen5(newArr.slice());
    };
    const handleClickOpen6 = (index) => {
        var newArr = open6;
        open6[index] = true;
        setOpen6(newArr.slice());
    };

    const handleClose6 = (index) => {
        var newArr = open6;
        open6[index] = false;
        setOpen6(newArr.slice());
    };

    const addClass = (newClass, day) => {
        if (day === "1") {
            setClasses([...createdClasses, newClass]);
        }
        if (day === "2") {
            setClasses2([...createdClasses2, newClass]);
        }
        if (day === "3") {
            setClasses3([...createdClasses3, newClass]);
        }
        if (day === "4") {
            setClasses4([...createdClasses4, newClass]);
        }
        if (day === "5") {
            setClasses5([...createdClasses5, newClass]);
        }
        if (day === "6") {
            setClasses6([...createdClasses6, newClass]);
        }
    }

    const saveClass = (currClass, currIndex, day) => {
        if (day === "1") {
            let newClass = [...createdClasses];
            newClass[currIndex] = currClass;

            setClasses(newClass);
        }
        if (day === "2") {
            let newClass = [...createdClasses2];
            newClass[currIndex] = currClass;

            setClasses2(newClass);
        }
        if (day === "3") {
            let newClass = [...createdClasses3];
            newClass[currIndex] = currClass;

            setClasses3(newClass);
        }
        if (day === "4") {
            let newClass = [...createdClasses4];
            newClass[currIndex] = currClass;

            setClasses4(newClass);
        }
        if (day === "5") {
            let newClass = [...createdClasses5];
            newClass[currIndex] = currClass;

            setClasses5(newClass);
        }
        if (day === "6") {
            let newClass = [...createdClasses6];
            newClass[currIndex] = currClass;

            setClasses6(newClass);
        }
    }

    const deleteClass = (index, day) => {
        if (day === "1") {
            createdClasses.splice(index, 1);
            handleClose(index);
        }
        if (day === "2") {
            createdClasses2.splice(index, 1);
            handleClose2(index);
        }
        if (day === "3") {
            createdClasses3.splice(index, 1);
            handleClose3(index);
        }
        if (day === "4") {
            createdClasses4.splice(index, 1);
            handleClose4(index);
        }
        if (day === "5") {
            createdClasses5.splice(index, 1);
            handleClose5(index);
        }
        if (day === "6") {
            createdClasses6.splice(index, 1);
            handleClose6(index);
        }
    }


    function goBack() {
        // upload the classes to firestore
        firestore.db.collection('users').doc(localStorage.getItem('uid')).set({ "classes": JSON.stringify(createdClasses), "classes2": JSON.stringify(createdClasses2), "classes3": JSON.stringify(createdClasses3), "classes4": JSON.stringify(createdClasses4), "classes5": JSON.stringify(createdClasses5), "classes6": JSON.stringify(createdClasses6) }).then(result => {

            window.location.href = "/";
        });

    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if ((!user.emailVerified) && (window.location.pathname === '/')) {
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
            localStorage.setItem('uid', user.uid);
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

    function DisplayClasses() {
        return (createdClasses.map((item, index) =>
            <>
                <Paper className={classes.paper} elevation={3} variant="outlined">
                    <Grid container spacing={2} direction="column">
                        <Grid item align="left" >
                            <Box display="flex">
                                <Typography gutterBottom variant="h6">
                                    <b>{item[0]}</b>
                                </Typography>
                                <div>
                                    <IconButton onClick={() => { handleClickOpen(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Dialog disableBackdropClick open={open[index]} onClose={() => { handleClose(index) }} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Delete Class</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Are you sure you want to delete {item[0]} in day 1?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { handleClose(index) }} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => { deleteClass(index, "1") }} color="primary">
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <ClassDialog currClass={item} currIndex={index} saveClass={saveClass} day="1" />
                            </Box>
                        </Grid>
                        <Grid item align="left">
                            <Typography variant="body1" gutterBottom>
                                Room: {item[1]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Teacher: {item[2]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Begin Time: {item[3]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class End Time: {item[4]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Color: {item[5]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        ));
    }

    function DisplayClasses2() {
        return (createdClasses2.map((item, index) =>
            <>
                <Paper className={classes.paper} elevation={3} variant="outlined">
                    <Grid container spacing={2} direction="column">
                        <Grid item align="left" >
                            <Box display="flex">
                                <Typography gutterBottom variant="h6">
                                    <b>{item[0]}</b>
                                </Typography>
                                <div>
                                    <IconButton onClick={() => { handleClickOpen2(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Dialog disableBackdropClick open={open2[index]} onClose={() => { handleClose2(index) }} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Delete Class</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Are you sure you want to delete {item[0]} in day 2?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { handleClose2(index) }} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => { deleteClass(index, "2") }} color="primary">
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <ClassDialog currClass={item} currIndex={index} saveClass={saveClass} day="2" />
                            </Box>
                        </Grid>
                        <Grid item align="left">
                            <Typography variant="body1" gutterBottom>
                                Room: {item[1]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Teacher: {item[2]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Begin Time: {item[3]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class End Time: {item[4]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Color: {item[5]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        ));
    }

    function DisplayClasses3() {
        return (createdClasses3.map((item, index) =>
            <>
                <Paper className={classes.paper} elevation={3} variant="outlined">
                    <Grid container spacing={2} direction="column">
                        <Grid item align="left" >
                            <Box display="flex">
                                <Typography gutterBottom variant="h6">
                                    <b>{item[0]}</b>
                                </Typography>
                                <div>
                                    <IconButton onClick={() => { handleClickOpen3(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Dialog disableBackdropClick open={open3[index]} onClose={() => { handleClose3(index) }} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Delete Class</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Are you sure you want to delete {item[0]} in day 3?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { handleClose3(index) }} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => { deleteClass(index, "3") }} color="primary">
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <ClassDialog currClass={item} currIndex={index} saveClass={saveClass} day="3" />
                            </Box>
                        </Grid>
                        <Grid item align="left">
                            <Typography variant="body1" gutterBottom>
                                Room: {item[1]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Teacher: {item[2]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Begin Time: {item[3]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class End Time: {item[4]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Color: {item[5]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        ));
    }

    function DisplayClasses4() {
        return (createdClasses4.map((item, index) =>
            <>
                <Paper className={classes.paper} elevation={3} variant="outlined">
                    <Grid container spacing={2} direction="column">
                        <Grid item align="left" >
                            <Box display="flex">
                                <Typography gutterBottom variant="h6">
                                    <b>{item[0]}</b>
                                </Typography>
                                <div>
                                    <IconButton onClick={() => { handleClickOpen4(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Dialog disableBackdropClick open={open4[index]} onClose={() => { handleClose4(index) }} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Delete Class</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Are you sure you want to delete {item[0]} in day 4?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { handleClose4(index) }} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => { deleteClass(index, "4") }} color="primary">
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <ClassDialog currClass={item} currIndex={index} saveClass={saveClass} day="4" />
                            </Box>
                        </Grid>
                        <Grid item align="left">
                            <Typography variant="body1" gutterBottom>
                                Room: {item[1]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Teacher: {item[2]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Begin Time: {item[3]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class End Time: {item[4]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Color: {item[5]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        ));
    }

    function DisplayClasses5() {
        return (createdClasses5.map((item, index) =>
            <>
                <Paper className={classes.paper} elevation={3} variant="outlined">
                    <Grid container spacing={2} direction="column">
                        <Grid item align="left" >
                            <Box display="flex">
                                <Typography gutterBottom variant="h6">
                                    <b>{item[0]}</b>
                                </Typography>
                                <div>
                                    <IconButton onClick={() => { handleClickOpen5(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Dialog disableBackdropClick open={open5[index]} onClose={() => { handleClose5(index) }} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Delete Class</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Are you sure you want to delete {item[0]} in day 5?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { handleClose5(index) }} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => { deleteClass(index, "5") }} color="primary">
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <ClassDialog currClass={item} currIndex={index} saveClass={saveClass} day="5" />
                            </Box>
                        </Grid>
                        <Grid item align="left">
                            <Typography variant="body1" gutterBottom>
                                Room: {item[1]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Teacher: {item[2]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Begin Time: {item[3]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class End Time: {item[4]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Color: {item[5]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        ));
    }

    function DisplayClasses6() {
        return (createdClasses6.map((item, index) =>
            <>
                <Paper className={classes.paper} elevation={3} variant="outlined">
                    <Grid container spacing={2} direction="column">
                        <Grid item align="left" >
                            <Box display="flex">
                                <Typography gutterBottom variant="h6">
                                    <b>{item[0]}</b>
                                </Typography>
                                <div>
                                    <IconButton onClick={() => { handleClickOpen6(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Dialog disableBackdropClick open={open6[index]} onClose={() => { handleClose6(index) }} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Delete Class</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Are you sure you want to delete {item[0]} in day 6?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => { handleClose6(index) }} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => { deleteClass(index, "6") }} color="primary">
                                                Yes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                                <ClassDialog currClass={item} currIndex={index} saveClass={saveClass} day="6" />
                            </Box>
                        </Grid>
                        <Grid item align="left">
                            <Typography variant="body1" gutterBottom>
                                Room: {item[1]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Teacher: {item[2]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Begin Time: {item[3]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class End Time: {item[4]}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Class Color: {item[5]}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        ));
    }

    const [lopen, lsetOpen] = React.useState(false);
    const [lopen2, lsetOpen2] = React.useState(false);
    const [lopen3, lsetOpen3] = React.useState(false);
    const [lopen4, lsetOpen4] = React.useState(false);
    const [lopen5, lsetOpen5] = React.useState(false);
    const [lopen6, lsetOpen6] = React.useState(false);
    const lhandleClick = () => {
        lsetOpen(!lopen);
    };
    const lhandleClick2 = () => {
        lsetOpen2(!lopen2);
    };
    const lhandleClick3 = () => {
        lsetOpen3(!lopen3);
    };
    const lhandleClick4 = () => {
        lsetOpen4(!lopen4);
    };
    const lhandleClick5 = () => {
        lsetOpen5(!lopen5);
    };
    const lhandleClick6 = () => {
        lsetOpen6(!lopen6);
    };

    return <div>
        <div className="App">
            <header className='App-header'>
            </header>
            <Container maxWidth='sm'>
                <div className={classes.root}>
                    <div className={classes.paper}>
                        <Grid container direction="row" spacing={2} alignItems="center" justify="center">
                            <Grid item align="center"><IconButton onClick={goBack}><ArrowBackIcon /></IconButton></Grid>

                            <Grid item style={{ marginLeft: 10, marginRight: 10 }} align="center">

                                <Typography variant="h5" gutterBottom>
                                    Edit Classes
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography variant="body1" gutterBottom>Tip: Please add the classes for each day in chronological order.</Typography>
                    </div>

                    <Grid container justifyContent="center" direction="row">
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }} style={{ justifyContent: "center" }}>
                            <ListItemButton onClick={lhandleClick}>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Day 1 Classes" />
                                {lopen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={lopen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <div className={classes.paper}>
                                        <Grid container direction="row" spacing={2} alignItems="center" justify="center">

                                            <Grid item style={{ marginLeft: 10, marginRight: 10 }} align="center">

                                                <Typography variant="h5" gutterBottom>
                                                    Day 1 Classes
                                                </Typography>
                                            </Grid>

                                            <ClassDialog addClass={addClass} day="1" />
                                        </Grid>
                                    </div>
                                    <DisplayClasses />
                                </List>
                            </Collapse>
                        </List>
                    </Grid>

                    <Grid container justifyContent="center" direction="row">
                        <List sx={{ width: '100%',bgcolor: 'background.paper' }} style={{ justifyContent: "center" }}>
                            <ListItemButton onClick={lhandleClick2}>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Day 2 Classes" />
                                {lopen2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={lopen2} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <div className={classes.paper}>
                                        <Grid container direction="row" spacing={2} alignItems="center" justify="center">

                                            <Grid item style={{ marginLeft: 10, marginRight: 10 }} align="center">

                                                <Typography variant="h5" gutterBottom>
                                                    Day 2 Classes
                                                </Typography>
                                            </Grid>

                                            <ClassDialog addClass={addClass} day="2" />
                                        </Grid>
                                    </div>
                                    <DisplayClasses2 />
                                </List>
                            </Collapse>
                        </List>
                    </Grid>

                    <Grid container justifyContent="center" direction="row">
                        <List sx={{ width: '100%',bgcolor: 'background.paper' }} style={{ justifyContent: "center" }}>
                            <ListItemButton onClick={lhandleClick3}>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Day 3 Classes" />
                                {lopen3 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={lopen3} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <div className={classes.paper}>
                                        <Grid container direction="row" spacing={2} alignItems="center" justify="center">

                                            <Grid item style={{ marginLeft: 10, marginRight: 10 }} align="center">

                                                <Typography variant="h5" gutterBottom>
                                                    Day 3 Classes
                                                </Typography>
                                            </Grid>

                                            <ClassDialog addClass={addClass} day="3" />
                                        </Grid>
                                    </div>
                                    <DisplayClasses3 />
                                </List>
                            </Collapse>
                        </List>
                    </Grid>

                    <Grid container justifyContent="center" direction="row">
                        <List sx={{ width: '100%',bgcolor: 'background.paper' }} style={{ justifyContent: "center" }}>
                            <ListItemButton onClick={lhandleClick4}>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Day 4 Classes" />
                                {lopen4 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={lopen4} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <div className={classes.paper}>
                                        <Grid container direction="row" spacing={2} alignItems="center" justify="center">

                                            <Grid item style={{ marginLeft: 10, marginRight: 10 }} align="center">

                                                <Typography variant="h5" gutterBottom>
                                                    Day 4 Classes
                                                </Typography>
                                            </Grid>

                                            <ClassDialog addClass={addClass} day="4" />
                                        </Grid>
                                    </div>
                                    <DisplayClasses4 />
                                </List>
                            </Collapse>
                        </List>
                    </Grid>

                    <Grid container justifyContent="center" direction="row">
                        <List sx={{ width: '100%',bgcolor: 'background.paper' }} style={{ justifyContent: "center" }}>
                            <ListItemButton onClick={lhandleClick5}>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Day 5 Classes" />
                                {lopen5 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={lopen5} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <div className={classes.paper}>
                                        <Grid container direction="row" spacing={2} alignItems="center" justify="center">

                                            <Grid item style={{ marginLeft: 10, marginRight: 10 }} align="center">

                                                <Typography variant="h5" gutterBottom>
                                                    Day 5 Classes
                                                </Typography>
                                            </Grid>

                                            <ClassDialog addClass={addClass} day="5" />
                                        </Grid>
                                    </div>
                                    <DisplayClasses5 />
                                </List>
                            </Collapse>
                        </List>
                    </Grid>
                    
                    <Grid container justifyContent="center" direction="row">
                        <List sx={{ width: '100%',bgcolor: 'background.paper' }} style={{ justifyContent: "center" }}>
                            <ListItemButton onClick={lhandleClick6}>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Day 6 Classes" />
                                {lopen6 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={lopen6} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <div className={classes.paper}>
                                        <Grid container direction="row" spacing={2} alignItems="center" justify="center">

                                            <Grid item style={{ marginLeft: 10, marginRight: 10 }} align="center">

                                                <Typography variant="h5" gutterBottom>
                                                    Day 6 Classes
                                                </Typography>
                                            </Grid>

                                            <ClassDialog addClass={addClass} day="6" />
                                        </Grid>
                                    </div>
                                    <DisplayClasses6 />
                                </List>
                            </Collapse>
                        </List>
                    </Grid>

                </div>
            </Container>

        </div>
    </div>
}

export default Classes;