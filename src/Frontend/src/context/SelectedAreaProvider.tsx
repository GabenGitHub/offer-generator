import { Dispatch, SetStateAction, useState } from "react";
import { AreaProperties } from "../models/area-properties";
import { SelectedAreaContext } from "./contexts";

export const SelectedAreaProvider = ({children}: any) => {
    const [selectedAreas, setSelectedAreas]: [AreaProperties[], Dispatch<SetStateAction<AreaProperties[]>>] = useState<any>([]);

    return (
        // @ts-ignore
        <SelectedAreaContext.Provider value={{ selectedAreas, setSelectedAreas }}>
            {children}
        </SelectedAreaContext.Provider>
    )
}