import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import './loader.js'
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import EventIcon from '@mui/icons-material/Event';
import { MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BusinessIcon from '@material-ui/icons/Business';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import firestore from './firestore.js';
import firebase from "firebase";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router';
import "firebase/auth";

var now = new Date();
var allClasses = request();
var createdClasses = [];
var createdClasses2 = [];
var createdClasses3 = [];
var createdClasses4 = [];
var createdClasses5 = [];
var createdClasses6 = [];
var todayDay;
var todayEvents = filter(allClasses, now);
console.log(todayEvents)

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        maxWidth: 500,
    },
    btnRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(-1.5),
        },
    },
    round: {
        borderRadius: "5em",
        backgroundColor: "#b3b3b3",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function request() {

    const $ = window.$;
    var classes;

    $.ajaxSetup({ // force getJSON to finish before continuing
        async: false
    });

    $.getJSON("https://clients6.google.com/calendar/v3/calendars/lexingtonma.org_iopgh49g29hj15t9tp9163pvl8@group.calendar.google.com/events?calendarId=lexingtonma.org_iopgh49g29hj15t9tp9163pvl8%40group.calendar.google.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=500&sanitizeHtml=true&timeMin=2021-11-01T00%3A00%3A00-05%3A00&timeMax=2022-03-06T00%3A00%3A00-05%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs", function (data) {
        classes = data;
    });

    return classes;
}

function datesAreOnSameDay(first, second) {
    return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
}

function formatDate(date) {
    // converts date into yyyy-mm-dd format
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function filter(data, currDate) {
    // use date as the key, the variable is array of events in that day.
    let dates = new Map();
    var tempDay = -1;

    for (var x = 0; x < data.items.length; x++) { // if the date isn't today, remove it
        var day;
        if (data.items[x].start.date === undefined) {
            data.items[x].start.date = data.items[x].start.dateTime.substring(0, 10);
        }
        day = new Date(data.items[x].start.date);
        var tomorrow = new Date(day);
        tomorrow.setDate(day.getDate() + 1);
        day = new Date(tomorrow);


        if (datesAreOnSameDay(day, currDate) && data.items[x].summary.substr(0, 3) === "Day") {
            var todayDayString = data.items[x].summary;
            tempDay = parseInt(todayDayString.substr(4, 1));
            if (datesAreOnSameDay(now, new Date())) {
                localStorage.setItem('todayDay', todayDay);
            }
            console.log(tempDay)


        }
        else if (dates[formatDate(day)] === undefined) {
            dates[formatDate(day)] = [data.items[x].summary];
        } else {
            dates[formatDate(day)].push(data.items[x].summary);
        }
    }

    todayDay = tempDay;
    if (dates[formatDate(currDate)] === undefined) {
        dates[formatDate(currDate)] = ["None"]
    }

    return dates;
}


function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

function isBlank(str) {
    return (!!!str || /^\s*$/.test(str));
}


function DisplayClasses() {
    const classes = useStyles();
    if (todayDay === 1) {
        return (
            createdClasses.map((item) =>
                <>
                    <Paper className={classes.paper} elevation={3} variant="outlined">
                        <Grid container alignItems='center' justifyContent='center' spacing={2} direction="column">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>{item[0]}&nbsp; {isBlank(item[5]) ? null : ("(" + item[5] + ")")}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.round}>
                                <Typography variant="body2" display="inline" style={{ marginLeft: 5, marginRight: 5 }}>
                                    Room:&nbsp;{item[1]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2">
                                    {item[3]}&nbsp;-&nbsp;{item[4]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )
        )
    }
    if (todayDay === 2) {
        return (
            createdClasses2.map((item) =>
                <>
                    <Paper className={classes.paper} elevation={3} variant="outlined">
                        <Grid container alignItems='center' justifyContent='center' spacing={2} direction="column">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>{item[0]}&nbsp; {isBlank(item[5]) ? null : ("(" + item[5] + ")")}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.round}>
                                <Typography variant="body2" display="inline" style={{ marginLeft: 5, marginRight: 5 }}>
                                    Room:&nbsp;{item[1]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2">
                                    {item[3]}&nbsp;-&nbsp;{item[4]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )
        )
    }
    if (todayDay === 3) {
        return (
            createdClasses3.map((item) =>
                <>
                    <Paper className={classes.paper} elevation={3} variant="outlined">
                        <Grid container alignItems='center' justifyContent='center' spacing={2} direction="column">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>{item[0]}&nbsp; {isBlank(item[5]) ? null : ("(" + item[5] + ")")}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.round}>
                                <Typography variant="body2" display="inline" style={{ marginLeft: 5, marginRight: 5 }}>
                                    Room:&nbsp;{item[1]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2">
                                    {item[3]}&nbsp;-&nbsp;{item[4]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )
        )
    }
    if (todayDay === 4) {
        return (
            createdClasses4.map((item) =>
                <>
                    <Paper className={classes.paper} elevation={3} variant="outlined">
                        <Grid container alignItems='center' justifyContent='center' spacing={2} direction="column">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>{item[0]}&nbsp; {isBlank(item[5]) ? null : ("(" + item[5] + ")")}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.round}>
                                <Typography variant="body2" display="inline" style={{ marginLeft: 5, marginRight: 5 }}>
                                    Room:&nbsp;{item[1]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2">
                                    {item[3]}&nbsp;-&nbsp;{item[4]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )
        )
    }
    if (todayDay === 5) {
        return (
            createdClasses5.map((item) =>
                <>
                    <Paper className={classes.paper} elevation={3} variant="outlined">
                        <Grid container alignItems='center' justifyContent='center' spacing={2} direction="column">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>{item[0]}&nbsp; {isBlank(item[5]) ? null : ("(" + item[5] + ")")}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.round}>
                                <Typography variant="body2" display="inline" style={{ marginLeft: 5, marginRight: 5 }}>
                                    Room:&nbsp;{item[1]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2">
                                    {item[3]}&nbsp;-&nbsp;{item[4]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )
        )
    }
    if (todayDay === 6) {
        return (
            createdClasses6.map((item) =>
                <>
                    <Paper className={classes.paper} elevation={3} variant="outlined">
                        <Grid container alignItems='center' justifyContent='center' spacing={2} direction="column">
                            <Grid item>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>{item[0]}&nbsp; {isBlank(item[5]) ? null : ("(" + item[5] + ")")}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.round}>
                                <Typography variant="body2" display="inline" style={{ marginLeft: 5, marginRight: 5 }}>
                                    Room:&nbsp;{item[1]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2">
                                    {item[3]}&nbsp;-&nbsp;{item[4]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            )
        )
    }
}

function yesterday() {
    todayDay = undefined;
    now.setDate(now.getDate() - 1);
    todayEvents = filter(allClasses, now);
}

function tomorrow() {
    todayDay = undefined;
    var tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    now = new Date(tomorrow);
    todayEvents = filter(allClasses, now);
}



function today() {
    todayDay = undefined;
    now = new Date();
    todayEvents = filter(allClasses, now);
}

var gotten = false;


function Schedule() {
    const classes = useStyles();
    let history = useHistory();

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var day = days[now.getDay()];
    var month = months[now.getMonth()];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const forceUpdate = useForceUpdate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const gotoClasses = () => {
        history.push("/classes")
    };

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
        handleClose();
    }

    const signOut = () => {
        firebase.auth().signOut().then(() => {
            localStorage.clear();
            history.push("/signin");
        }).catch((error) => {
            console.log(error);
        })
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
            getClassesFromFirestore();
        } else {
            localStorage.clear()
            if (window.location.pathname !== '/signin' && window.location.pathname !== '/signup') {
                history.push('/signin')
            }
        }
    })

    

    function getClassesFromFirestore() {
        if (gotten === true || localStorage.getItem('uid') === undefined || localStorage.getItem('uid') === "") {
            return;
        } else {
            firestore.db.collection('users').doc(localStorage.getItem('uid')).get().then((value) => {
                var data = value.data();

                createdClasses = [];
                createdClasses2 = [];
                createdClasses3 = [];
                createdClasses4 = [];
                createdClasses5 = [];
                createdClasses6 = [];

                if (data !== undefined) {
                    if (data.classes !== undefined) {
                        createdClasses = JSON.parse(data.classes);
                    }
                    if (data.classes2 !== undefined) {
                        createdClasses2 = JSON.parse(data.classes2);
                    }
                    if (data.classes3 !== undefined) {
                        createdClasses3 = JSON.parse(data.classes3);
                    }
                    if (data.classes4 !== undefined) {
                        createdClasses4 = JSON.parse(data.classes4);
                    }
                    if (data.classes5 !== undefined) {
                        createdClasses5 = JSON.parse(data.classes5);
                    }
                    if (data.classes6 !== undefined) {
                        createdClasses6 = JSON.parse(data.classes6);
                    }
                }
                localStorage.setItem('createdClasses', JSON.stringify(createdClasses));
                localStorage.setItem('createdClasses2', JSON.stringify(createdClasses2));
                localStorage.setItem('createdClasses3', JSON.stringify(createdClasses3));
                localStorage.setItem('createdClasses4', JSON.stringify(createdClasses4));
                localStorage.setItem('createdClasses5', JSON.stringify(createdClasses5));
                localStorage.setItem('createdClasses6', JSON.stringify(createdClasses6));

                gotten = true;
                forceUpdate()

            })
        }
    }

    function DatePicker() {
        const [selectedDate, setSelectedDate] = React.useState(now);

        const handleDateChange = (date) => {
            if (date instanceof Date && !isNaN(date.valueOf())) {
                now = date;
                todayEvents = filter(allClasses, now);
                setSelectedDate(date);
                forceUpdate();
            }
        };


        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Select a day to view"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        )
    }

    function DisplayDay() {
        return todayDay !== -1 ? <Paper className={classes.paper} elevation={3} variant="outlined">Today is day {todayDay} of 6.</Paper> : null;
    }

    function NoClasses() {
        const classes = useStyles();
        todayDay = -1;
        return (
            <Paper className={classes.paper} elevation={3} variant="outlined">
                <Typography gutterBottom variant="subtitle1">
                    No class today
                </Typography>
            </Paper>
        )
    }

    function DisplayInfo() {

        return (
            <>
                <DisplayDay />
                <DisplayClasses />
            </>
        )
    }


    function DisplayEvents() {
        const [open, setOpen] = React.useState(false);
        var eventMsg = "Events Today (";
        if (todayEvents[formatDate(now)][0] === "None") {
            eventMsg = eventMsg + "0)";
        } else {
            eventMsg = eventMsg + todayEvents[formatDate(now)].length + ")";
        }

        const handleClicke = () => {
            setOpen(!open);
        };
        return (
            <>
                <Grid container justifyContent="center" direction="row">
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} style={{ justifyContent: "center" }}>
                        <ListItemButton onClick={handleClicke}>
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                            <ListItemText primary={eventMsg} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {todayEvents[formatDate(now)].map((event) =>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary={event} />
                                    </ListItemButton>)}
                            </List>
                        </Collapse>
                    </List>
                </Grid>
            </>
        )
    }


    return (
        <div>
            <Backdrop className={classes.backdrop} open={!gotten}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="App">
                <header className='App-header'>
                </header>

                <Container maxWidth='sm'>
                    <div className={classes.root} >
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <Typography variant="h5" gutterBottom align="center">
                                    {day}, {month} {now.getDate()}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={gotoClasses}>
                                        <ListItemIcon>
                                            <BusinessIcon />
                                        </ListItemIcon>
                                        <Typography variant="inherit">Edit Classes</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { openInNewTab('mailto:liubaoren2006@gmail.com') }}>
                                        <ListItemIcon>
                                            <MailOutlineOutlinedIcon />
                                        </ListItemIcon>
                                        <Typography variant="inherit">Feedback</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={signOut}>
                                        <ListItemIcon>
                                            <ExitToAppIcon />
                                        </ListItemIcon>
                                        <Typography variant="inherit">Sign Out</Typography>
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>


                        <div className={classes.btnRoot}>
                            <Box color="primary">
                                <Button variant="contained" disableElevation id="yesterday" color="primary" style={{ textTransform: "none", margin: 10 }} onClick={() => { yesterday(); forceUpdate(); }}>Previous</Button>
                                {(new Date(now).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)) ? (<Button variant="outlined" disableElevation color="secondary" style={{ textTransform: "none" }} onClick={() => { today(); forceUpdate() }}>Today</Button>) : <Button variant="outlined" disableElevation color="secondary" style={{ textTransform: "none" }} disabled>Today</Button>}
                                <Button variant="contained" disableElevation color="primary" id="tomorrow" style={{ textTransform: "none", margin: 10 }} onClick={() => { tomorrow(); forceUpdate(); }}>Next</Button>

                            </Box>
                        </div>
                        <DatePicker />

                        <DisplayEvents />

                        {(todayDay === -1) ? (<NoClasses />) : <DisplayInfo />}

                        <Typography variant="body1" align="left" style={{ marginTop: 50, color: "#808080" }}>Disclaimer: The schedule might not be accurate on special days such as half days etc.</Typography>
                        <Typography variant="body1" align="left" style={{ marginBottom: 50, color: "#808080" }}>Made by Baoren Liu</Typography>
                    </div>
                </Container>

            </div>
        </div>
    )
}

export default Schedule;