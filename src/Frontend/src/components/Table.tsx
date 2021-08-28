import React, { useContext } from "react";
import { SelectedAreaContext } from "../context/contexts";
import { AreaProperties } from "../models/area-properties"
import { formatNumberWithCommas } from "../utils/utils";
import Button from "./Button";
import { StyledTable } from "./Table.style";


const Table: React.FC<any> = () => {
    const { selectedAreas, setSelectedAreas } = useContext<any>(SelectedAreaContext)

    const removeArea = (area: AreaProperties): any => {
        // @ts-ignore
        const newArr = selectedAreas.filter(a => a.name !== area.name);
        setSelectedAreas(newArr);
    };

    if (selectedAreas.length !== 0) {
        return (
            <StyledTable>
                <thead>
                    <tr>
                        <th>Terület</th>
                        <th colSpan={2}>Népesség</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    selectedAreas.map((area: AreaProperties, i: number) => 
                        (
                            <tr key={i}>
                                <td>{area.name}</td>
                                <td>{formatNumberWithCommas(area.population)} fő</td>
                                <td><Button onClick={() => removeArea(area)} value={"Törlés"} /></td>
                            </tr>
                        )
                    )
                    }
                </tbody>
            </StyledTable>
        )
    }
    return <></>
}

export default Table
