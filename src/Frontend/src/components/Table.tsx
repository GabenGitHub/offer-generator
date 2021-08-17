import React from "react";
import { AreaProperties } from "../models/area-properties"
import { StyledTable } from "./Table.style";


const Table: React.FC<any> = ({selectedAreas, removeArea}) => {

    const formatNumberWithCommas = (number: number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
                                <td>{area.megye}</td>
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
    return <></>
}

export default Table
