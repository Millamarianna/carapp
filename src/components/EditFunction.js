import React, { useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditFunction(props) {

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = useState({ brand: '', color: '', fuel: '', model: '', price: '', year: '' });
    const link = props.value;

    const defineRow = () => {
        console.log(link);
        fetch(link)
            .then(response => response.json())
            .then(rowdata => {
                console.log(rowdata);
                setCar(rowdata);
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        console.log(car);
        setCar({ ...car, [event.target.name]: event.target.value })
    };

    const editCar = () => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                props.fetchData()})
            .catch(err => console.error(err))
};




    return (<div>
            <Button variant="outlined" onClick={() => {defineRow(); handleClickOpen()}}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="brand" value={car.brand} onChange={event => handleInputChange(event)} label="Brand" type="text" fullWidth variant="standard" />
                    <TextField margin="dense" name="color" value={car.color} onChange={event => handleInputChange(event)} label="Color" type="text" fullWidth />
                    <TextField margin="dense" name="fuel" value={car.fuel} onChange={event => handleInputChange(event)} label="Fuel" type="text" fullWidth />
                    <TextField margin="dense" name="model" value={car.model} onChange={event => handleInputChange(event)} label="Model" type="text" fullWidth />
                    <TextField margin="dense" name="price" value={car.price} onChange={event => handleInputChange(event)} label="Price" type="text" fullWidth />
                    <TextField margin="dense" name="year" value={car.year} onChange={event => handleInputChange(event)} label="Year" type="text" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {handleClose(); editCar();}}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditFunction;

