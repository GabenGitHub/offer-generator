import React, { useContext } from "react";
import { SelectedAreaContext } from "../context/contexts";
import { AreaProperties } from "../models/area-properties"
import { formatNumberWithCommas } from "../utils/utils";
import { useTranslation } from 'react-i18next';
import Button from "./Button";
import { StyledTable } from "./Table.style";


const Table: React.FC<any> = () => {
    const { selectedAreas, setSelectedAreas } = useContext<any>(SelectedAreaContext)
    const { t } = useTranslation();

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
                        <th>{t('table.territory')}</th>
                        <th colSpan={2}>{t('table.mailbox')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    selectedAreas.map((area: AreaProperties, i: number) => 
                        (
                            <tr key={i}>
                                <td>{area.name}</td>
                                <td>{formatNumberWithCommas(area.mailbox)} {t('table.pcs')}</td>
                                <td><Button onClick={() => removeArea(area)} value={t('table.delete')} /></td>
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
