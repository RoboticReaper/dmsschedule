import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';

var nameError = false;

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

export default function ClassDialog({ addClass, currClass, currIndex, saveClass, day}) {
    var initName = "";
    var initRoom = "";
    var initTeacher = "";
    var initBeginTime = "";
    var initEndTime = "";
    var initColor = "";

    if (currClass !== undefined) {
        // fill out the field based on currClass's data
        initName = currClass[0];
        initRoom = currClass[1];
        initTeacher = currClass[2];
        initBeginTime = currClass[3];
        initEndTime = currClass[4];
        initColor = currClass[5];
        
    }


    const classes = useStyles();
    const forceUpdate = useForceUpdate();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };


    const [name, setName] = useState(initName);
    const [room, setRoom] = useState(initRoom);
    const [teacher, setTeacher] = useState(initTeacher);
    const [beginTime, setBeginTime] = useState(initBeginTime);
    const [endTime, setEndTime] = useState(initEndTime);
    const [color, setColor] = useState(initColor);

    const handleClose = () => {
        nameError = false;
        setOpen(false);
        setName(initName);
        setRoom(initRoom);
        setTeacher(initTeacher);
        setBeginTime(initBeginTime);
        setEndTime(initEndTime);
        setColor(initColor);
    };



    function submitData() {
        if (name === '') {
            nameError = true;
            forceUpdate();
            return;
        }

        var thisClass = [name, room, teacher, beginTime, endTime, color];
        addClass(thisClass, day);
        nameError = false;
        forceUpdate();
        handleClose();


    }


    function saveData() {
        if (name === '') {
            nameError = true;
            forceUpdate();
            return;
        }

        var thisClass = [name, room, teacher, beginTime, endTime, color];
        saveClass(thisClass, currIndex, day);
        nameError = false;
        forceUpdate();
        handleClose();
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <IconButton onClick={handleClickOpen}>
                    {currClass === undefined ? <AddIcon /> : <EditIcon />}
                </IconButton>
                <Dialog disableBackdropClick open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add/edit a day {day} class</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out fields below to add/edit your class.
                        </DialogContentText>
                        <TextField
                            variant="outlined"
                            required
                            helperText="Required"
                            autoFocus
                            value={name}
                            onChange={e => setName(e.target.value)}
                            label="Class name"
                            type="text"
                            error={nameError}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            variant="outlined"
                            value={room}
                            onChange={e => setRoom(e.target.value)}
                            label="Room #"
                            type="text"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            variant="outlined"
                            value={teacher}
                            onChange={e => setTeacher(e.target.value)}
                            label="Teacher"
                            type="text"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            variant="outlined"
                            value={beginTime}
                            onChange={e => setBeginTime(e.target.value)}
                            label="Class Start Time"
                            type="text"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            variant="outlined"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                            label="Class End Time"
                            type="text"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            variant="outlined"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            label="Class Color"
                            type="text"
                            fullWidth
                            margin="normal"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        {currClass === undefined ? <Button onClick={submitData} color="primary">
                            Add
                        </Button> :
                            <Button onClick={saveData} color="primary">Save</Button>}
                    </DialogActions>
                </Dialog>
            </div>
        </form>
    );
}
