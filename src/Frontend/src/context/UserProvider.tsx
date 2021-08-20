import { useState } from "react";
import { UserContext } from "./contexts";

export const UserProvider = ({children}: any) => {
    const [user, setUser]: [any, any] = useState<any>();

    return (
        // @ts-ignore
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}