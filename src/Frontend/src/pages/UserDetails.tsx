import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { FromContainerMain, StyledForm } from "../components/Form.style";
import Input from "../components/Input";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";
import { ResponsiveUser, StyledTableResponsiveUsers } from "../components/Table.style";
import { UserContext } from "../context/contexts";
import { DetailsContainer } from "./OfferDetails.style";

const UserDetails = () => {
    const { id } = useParams<any>();
    const { user, setUser } = useContext<any>(UserContext);

    const [ selectedUser, setSelectedUser ] = useState<any>();
    const [ deleted, setDeleted ] = useState<boolean>(false);
    const [ name, setName ] = useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/api/user/${id}`);
                setSelectedUser(response.data);
            } catch (error) {
                console.log(error);
            }
        })();

    }, [id]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.put(`/api/user/${id}`, {
            method: "PUT",
            data: {
                name,
            },
            withCredentials: true,
        });
    
        try {
            if (response.status === 200) {
                setSelectedUser(response.data);

                if (user.email === selectedUser.email) {
                    setUser(response.data);
                }
            }
        } catch (error) {
            console.log(error);      
        }
    };

    const onDelete = async () => {
        if (user.email === selectedUser.email) {
            return;
        }
        try {
            const response = await axios.delete(`/api/user/${id}`);
            if (response.status === 200) {
                setDeleted(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (deleted) {
        return <Redirect to="/admin" />;
    }

    return (
        <>
            <Menu />
            <DetailsContainer>
                <h1>Felhasználó részletei</h1>
                <StyledTableResponsiveUsers>
                    <thead>
                        <tr>
                            <th>Név</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ResponsiveUser>
                            <td>{selectedUser?.name}</td>
                            <td>{selectedUser?.email}</td>
                        </ResponsiveUser>
                    </tbody>
                </StyledTableResponsiveUsers>
            </DetailsContainer>

            {
                user?.email === selectedUser?.email
                ? null
                : (
                    <DetailsContainer>
                        <h2>Műveletek</h2>
                        <SubmitButton value="Felhasználó törlése" onClick={onDelete} />
                    </DetailsContainer>
                )
            }

            <FromContainerMain>
                <StyledForm onSubmit={handleSubmit}>
                <h2>Felhasználó módosítása</h2>
                <Input
                    required
                    label="Név*"
                    placeholder="Név"
                    handleChange={({ target: { value } }: any) => setName(value)}
                    value={name}
                />
                <SubmitButton value="Módosítás" />
                </StyledForm>
            </FromContainerMain>
        </>
    )
}

export default UserDetails
