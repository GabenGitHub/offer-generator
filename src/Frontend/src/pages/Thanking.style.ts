import styled from 'styled-components';

export const ThankyouContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;

    & div {
        padding: 1rem;
        margin: 2rem auto;
        max-width: 600px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid #e6e6e6;
        outline: none;
        font-family: sans-serif;
        font-weight: 100;
        font-size: 1rem;
        line-height: 1.5;
        background-color: lightgrey;
    }
    
    &:focus {
        border: 1px solid #6675df;
    }

    & h1, h2 {
        text-align: center;
        margin: 1rem 0;
    }

    & p {
        margin: 2rem 0;
    }

    @media (max-width: 768px) {
        margin: 2rem 1rem;
        width: unset;
    }
`