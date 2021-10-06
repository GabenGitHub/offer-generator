import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import { ResponsiveUser, StyledTableResponsiveUsers } from "../components/Table.style";
import { DetailsContainer } from "./OfferDetails.style";
import { useTranslation } from 'react-i18next';

const AdminUsers = () => {
    const [users, setUsers] = useState<any[]>([]);
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        (async () => {
            const users: AxiosResponse<any> = await axios.get("/api/users");
            setUsers(users.data);
        })()
    }, [])

    return (
        <>
            <DetailsContainer>
            <h2>{t('adminUsers.handlingUsers')}</h2>
            <StyledTableResponsiveUsers>
                <thead>
                    <tr>
                        <th>{t('adminUsers.name')}</th>
                        <th colSpan={2}>{t('adminUsers.email')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user: any, i: number) => {
                            return (
                                <ResponsiveUser key={i}>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td><Button onClick={() => history.push(`/user/${user._id}`)} value={t("adminUsers.details")} /></td>
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
