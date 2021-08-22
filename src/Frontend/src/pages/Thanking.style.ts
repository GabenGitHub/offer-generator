import styled from 'styled-components';

export const ThankyouContainer = styled.div`
    padding: 1rem;
    margin: 2rem auto;
    max-width: 1000px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #e6e6e6;
    outline: none;
    font-family: sans-serif;
    font-weight: 100;
    font-size: 1rem;
    line-height: 1.5;
    
    &:focus {
        border: 1px solid #6675df;
    }

    & h1, h2 {
        text-align: center;
    }

    & p {
        margin: 2rem 0;
    }
`