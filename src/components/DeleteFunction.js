import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';

function DeleteFunction(props) {

    const link = props.value;

    const deleteCar = () => {
        console.log(link);
        fetch(link, {method: 'DELETE'})
        .then(res => props.fetchData())
        .catch(err => console.error(err))
}

    return (
            <Button variant="outlined" onClick={deleteCar}>Delete</Button>

    );
};

export default DeleteFunction;

