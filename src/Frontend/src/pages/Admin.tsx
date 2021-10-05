import { useState } from "react";
import Button from "../components/Button";
import Menu from "../components/Menu"
import { SelectContainer } from "./Admin.style";
import AdminOffers from "./AdminOffers"
import AdminUsers from "./AdminUsers"
import { useTranslation } from 'react-i18next';

const Admin = () => {
    const [type, setType] = useState<any>("offers");
    const { t } = useTranslation();

    return (
        <>
            <Menu />
            <SelectContainer>
                <Button onClick={() => setType("offers")} value={t('admin.offers')} />
                <Button onClick={() => setType("users")} value={t('admin.users')} />
            </SelectContainer>
            {
                type === "offers" ? <AdminOffers /> : <AdminUsers />
            }
        </>
    )
}

export default Admin
