import React, { useContext } from "react";
import { SelectedAreaContext } from "../context/SelectedAreaContext";
import { AreaProperties } from "../models/area-properties"
import { StyledTable } from "./Table.style";


const Table: React.FC<any> = () => {
    const { selectedAreas, setSelectedAreas } = useContext<any>(SelectedAreaContext)
    console.log(selectedAreas)

    const formatNumberWithCommas = (number: number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

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
                                <td><button onClick={() => removeArea(area)}>Törlés</button></td>
                            </tr>
                        )
                    )
                    }
                </tbody>
            </StyledTable>
        )
    }
    return <>{selectedAreas}</>
}

export default Table
