import { useState } from "react";
import Button from "../components/Button";
import Menu from "../components/Menu"
import { SelectContainer } from "./Admin.style";
import AdminOffers from "./AdminOffers"
import AdminUsers from "./AdminUsers"


const Admin = () => {
    const [type, setType] = useState<any>("offers");
  

    return (
        <>
            <Menu />
            <SelectContainer>
                <Button onClick={() => setType("offers")} value={"Ajánlatok"} />
                <Button onClick={() => setType("users")} value={"Felhasználók"} />
            </SelectContainer>
            {
                type === "offers" ? <AdminOffers /> : <AdminUsers />
            }
        </>
    )
}

export default Admin
