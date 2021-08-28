import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { ResponsiveUser, StyledTableResponsiveUsers } from "../components/Table.style";
import { DetailsContainer } from "./OfferDetails.style";

const AdminUsers = () => {
    const [users, setUsers] = useState<any[]>([]);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const users = await axios.get("/api/users");
            setUsers(users.data);
        })()
    }, [])

    return (
        <>
            <DetailsContainer>
            <h2>Felhasználók kezelése</h2>
            <StyledTableResponsiveUsers>
                <thead>
                    <tr>
                        <th>Név</th>
                        <th colSpan={2}>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user: any, i: number) => {
                            return (
                                <ResponsiveUser key={i}>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td><Button onClick={() => history.push(`/user/${user._id}`)} value={"Részletek"} /></td>
                                </ResponsiveUser>
                            )
                        })
                    }
                </tbody>
            </StyledTableResponsiveUsers>
                
            </DetailsContainer>
        </>
    )
}

export default AdminUsers
