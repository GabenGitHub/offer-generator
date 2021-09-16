import { GridColDef, GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Status } from "../models/statusEnum";
import EnhancedTable from "./EnhancedTable";

const AdminOffers = () => {
    const [ offers, setOffers ] = useState<any[]>([]);
    const history = useHistory();
    
    useEffect(() => {
        (async () => {
            const offers = await axios.get("/api/offers");
            setOffers(offers.data);
        })()
    }, [])

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Név',
            filterable: true,
            flex: 1,
        },
        {
            field: 'company',
            headerName: 'Cég',
            description: 'Ajánlat beérkezésének dátuma',
            flex: 1,
        },
        {
            field: 'date',
            headerName: 'Dátum',
            description: 'Ajánlat beérkezésének dátuma',
            type: 'date',
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Státusz',
            description: 'Ajánlat státusza',
            type: 'singleSelect',
            valueOptions: [
                Status.PROCESSED,
                Status.UNDER_PROCESS,
                Status.UNPROCESSED,
            ],
            flex: 0.4,
        },
    ];

    const handleRowClick = (id: GridRowId) => {
        history.push(`/offer/${id}`);
    };
    
    return (
        <>
            <EnhancedTable
                data={offers}
                columns={columns}
                handleRowClick={handleRowClick}
            />
        </>
    )
}

export default AdminOffers
