import styled from 'styled-components';

export const StyledTableResponsive = styled.table`
    max-width: 1000px;
    width: 100%;
    text-align: left;
    margin: 2rem auto;

    & thead tr th {
        background-color: #ddd;
        padding: 0.5rem 1rem;
        
    }

    & tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    & th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
    }

    & td {
        padding: 0.5rem 1rem;
    }

    @media (max-width: 768px) {
        & table, thead, tbody, th, td, tr {
            display: block;
        }
        & thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
        }
        & td {
            position: relative;
            margin-left: 110px;
        }
        & td:before {
            position: absolute;
            padding-right: 40px;
            white-space: nowrap;
            margin-left: -110px;
        }
    }
`

export const StyledTableResponsiveUsers = styled(StyledTableResponsive)`
    @media (max-width: 768px) {
        & td {
            margin-left: 80px;
        }
        & td:before {
            margin-left: -80px;
        }
    }
`

export const ResponsiveOfferDetails = styled.tr`
    @media (max-width: 768px) {
        & td:nth-of-type(1):before { content: "Cég:"; }
        & td:nth-of-type(2):before { content: "Név:"; }
        & td:nth-of-type(3):before { content: "E-mail:"; }
        & td:nth-of-type(4):before { content: "Mennyiség:";}
        & td:nth-of-type(5):before { content: "Dátum:";}
    }
`

export const ResponsiveOfferAdmin = styled.tr`
    @media (max-width: 768px) {
        & td:nth-of-type(1):before { content: "Cég:"; }
        & td:nth-of-type(2):before { content: "Név:"; }
        & td:nth-of-type(3):before { content: "Dátum:";}
        & td:nth-of-type(4):before { content: "Státusz:";}
    }
`

export const ResponsiveAreas = styled.tr`
    @media (max-width: 768px) {
        & td:nth-of-type(1):before { content: "Terület:"; }
        & td:nth-of-type(2):before { content: "Postláda:"; }
    }
`
export const ResponsiveUser = styled.tr`
    @media (max-width: 768px) {
        & td:nth-of-type(1):before { content: "Név:"; }
        & td:nth-of-type(2):before { content: "E-mail:"; }
    }
`

export const StyledTable = styled.table`
    max-width: 1000px;
    width: 100%;
    text-align: left;
    margin: 2rem auto;

    & thead tr th {
        background-color: #ddd;
        padding: 0.5rem 1rem;
        
    }

    & tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    & th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
    }

    & td {
        padding: 0.5rem 1rem;
    }
`