import styled from 'styled-components';

export const StyledTable = styled.table`
    width: 100%;
    text-align: left;

    & thead {
        background-color: #ddd;
    }

    & tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    & tr:hover {
        background-color: #ddd;
    }

    & th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
    }

    & td:nth-child(3) {
        width: 100px;
        text-align: center;
    }
`