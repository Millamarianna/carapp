import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import EditFunction from './EditFunction';
import DeleteFunction from './DeleteFunction';
import AddFunction from './AddFunction';

function Carlist() {

    const [cars, setCars] = useState([]);
    const gridRef = useRef();
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('http://carrestapi.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => {
                console.log(data._embedded.cars);
                setCars(data._embedded.cars);
            })
    }

    const columns = [
        { field: 'brand', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true },
        { field: 'color', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true },
        { field: 'fuel', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true },
        { field: 'model', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true },
        { field: 'price', sortable: true, filter: true, flex: '1', floatingFilter: true, type: 'numericColumn', resizable: true },
        { field: 'year', sortable: true, filter: true, flex: '1', floatingFilter: true, type: 'numericColumn', resizable: true },
        { headerName: '', field: '_links.self.href', width: '90px',cellRenderer: EditFunction, cellRendererParams: { fetchData } },
        { headerName: '', field: '_links.self.href', width: '120px', cellRenderer: DeleteFunction, cellRendererParams: { fetchData } }
    ]


    return (
        <div className="ag-theme-material"
            style={{ height: '700px', width: '100%', margin: 'auto' }} >

            <AddFunction fetchData={fetchData} />

            <AgGridReact
                ref={gridRef}
                animateRows={true}
                rowSelection="single"
                columnDefs={columns}
                rowData={cars} />

        </div>

    );
};

export default Carlist;

