import { GridColDef, GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Status } from "../models/statusEnum";
import EnhancedTable from "./EnhancedTable";
import { useTranslation } from 'react-i18next';

const AdminOffers = () => {
    const [ offers, setOffers ] = useState<any[]>([]);
    const history = useHistory();
    const { t } = useTranslation();
    
    useEffect(() => {
        (async () => {
            const offers = await axios.get("/api/offers");
            setOffers(offers.data);
        })()
    }, [])

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('adminOffers.name'),
            filterable: true,
            flex: 1,
        },
        {
            field: 'company',
            headerName: t('adminOffers.company'),
            description: t('adminOffers.dateOfOffer'),
            flex: 1,
        },
        {
            field: 'date',
            headerName: t('adminOffers.date'),
            description: t('adminOffers.dateOfOffer'),
            type: 'date',
            flex: 1,
        },
        {
            field: 'status',
            headerName: t('adminOffers.status'),
            description: t('adminOffers.offerStatus'),
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
