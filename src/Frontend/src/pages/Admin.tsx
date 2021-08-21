import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Menu from "../components/Menu"
import { StyledTable } from "../components/Table.style"

const Admin = () => {
    const [ offers, setOffers ] = useState([]);

    const getOffers = async () => {
        const response = await axios.get("/api/offers")
        console.log(response.data);
        setOffers(response.data);
    }

    useEffect(() => {
        getOffers();
    }, [])

    return (
        <>
            <Menu />
            <h2>Ajánlat kérések</h2>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Cég</th>
                        <th>Név</th>
                        <th colSpan={2}>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        offers.map((offer: any, i: number) => {
                            return (
                                <tr key={i}>
                                    <td>{offer.company}</td>
                                    <td>{offer.name}</td>
                                    <td>{offer.email}</td>
                                    <td><Button onClick={() => {}} value="Részletek" /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </StyledTable>
        </>
    )
}

export default Admin
