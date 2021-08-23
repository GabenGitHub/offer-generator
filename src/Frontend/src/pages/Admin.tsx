import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Menu from "../components/Menu"
import { ResponsiveOfferAdmin, StyledTableResponsive } from "../components/Table.style"
import { formatDate } from "../utils/utils";
import { DetailsContainer } from "./OfferDetails.style";

const Admin = () => {
    const [ offers, setOffers ] = useState([]);
    const history = useHistory();

    const getOffers = async () => {
        const response = await axios.get("/api/offers")
        setOffers(response.data);
    };

    const displayStatus = ["Beérkezett", "Folyamatban", "Elküldve"];

    useEffect(() => {
        getOffers();
    }, [])

    return (
        <>
            <Menu />
            <DetailsContainer>
                <h2>Ajánlat kérések</h2>
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
                            offers.map((offer: any, i: number) => {
                                return (
                                    <ResponsiveOfferAdmin key={i}>
                                        <td>{offer?.company}</td>
                                        <td>{offer?.name}</td>
                                        <td>{formatDate(offer?.date)}</td>
                                        <td>{displayStatus[offer?.status]}</td>
                                        <td><button onClick={() => history.push(`/offer/${offer._id}`)}>Részletek</button></td>
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

export default Admin
