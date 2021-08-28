import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { ResponsiveOfferAdmin, StyledTableResponsive } from "../components/Table.style"
import { Status } from "../models/statusEnum";
import { formatDate } from "../utils/utils";
import { SelectContainer } from "./Admin.style";
import { DetailsContainer } from "./OfferDetails.style";

const AdminOffers = () => {
    const [ offers, setOffers ] = useState<any[]>([]);
    const [ filteredOffers, setFilteredOffers ] = useState<any[]>([]);
    const history = useHistory();

    
    useEffect(() => {
        (async () => {
            const offers = await axios.get("/api/offers")
            setOffers(offers.data);
            setFilteredOffers(offers.data);
        })()
    }, [])
    
    const sortOffers = (status: Status | null) => {
        if (status === null) {
            return setFilteredOffers(offers);
        }

        const filteredOffers = offers.filter(o => o.status === status);
        setFilteredOffers(filteredOffers);

    }

    return (
        <>
            <DetailsContainer>
                <h2>Ajánlat kérések</h2>
                <SelectContainer>
                    <Button onClick={() => sortOffers(null)} value={"Összes"} />
                    <Button onClick={() => sortOffers(Status.UNPROCESSED)} value={"Beérkezett"} />
                    <Button onClick={() => sortOffers(Status.PROCESSED)} value={"Elküldve"} />
                </SelectContainer>
                <StyledTableResponsive>
                    <thead>
                        <tr>
                            <th>Cég</th>
                            <th>Név</th>
                            <th>Dátum</th>
                            <th>Státusz</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredOffers.map((offer: any, i: number) => {
                                return (
                                    <ResponsiveOfferAdmin key={i}>
                                        <td>{offer?.company}</td>
                                        <td>{offer?.name}</td>
                                        <td>{formatDate(offer?.date)}</td>
                                        <td>{offer?.status}</td>
                                        <td><Button onClick={() => history.push(`/offer/${offer._id}`)} value={"Részletek"} /></td>
                                    </ResponsiveOfferAdmin>
                                )
                            })
                        }
                    </tbody>
                </StyledTableResponsive>
            </DetailsContainer>
        </>
    )
}

export default AdminOffers
