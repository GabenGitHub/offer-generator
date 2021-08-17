import styled from 'styled-components';

export const StyledTable = styled.table`
    max-width: 100vw;
    width: 500px;
    text-align: left;
    margin: 2rem auto;

    & thead tr th {
        background-color: #ddd;
        padding: 0.5rem 1rem;
        
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

    & td {
        padding: 0.5rem 1rem;
    }
`