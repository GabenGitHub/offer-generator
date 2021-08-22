import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Menu from "../components/Menu"
import { StyledTable } from "../components/Table.style"
import { formatDate } from "../utils/utils";
import { DetailsContainer } from "./OfferDetails.style";

const Admin = () => {
    const [ offers, setOffers ] = useState([]);
    const history = useHistory();

    const getOffers = async () => {
        const response = await axios.get("/api/offers")
        setOffers(response.data);
    }

    useEffect(() => {
        getOffers();
    }, [])

    return (
        <>
            <Menu />
            <DetailsContainer>
                <h2>Ajánlat kérések</h2>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Cég</th>
                            <th>Név</th>
                            <th>Dátum</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offers.map((offer: any, i: number) => {
                                return (
                                    <tr key={i}>
                                        <td>{offer?.company}</td>
                                        <td>{offer?.name}</td>
                                        <td>{formatDate(offer?.date)}</td>
                                        <td><button onClick={() => history.push(`/offer/${offer._id}`)}>Részletek</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </StyledTable>
            </DetailsContainer>
        </>
    )
}

export default Admin
