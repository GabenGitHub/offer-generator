import styled from 'styled-components';

export const DetailsContainer = styled.div`
    padding: 1rem;
    margin: 2rem auto;
    max-width: 1000px;
    width: 100%;
    border-radius: 10px;
    border: 2px solid #e6e6e6;
    outline: none;
    font-weight: 100;
    font-size: 1rem;
    line-height: 1.5;
    
    &:focus {
        border: 1px solid #6675df;
    }

    & h1, h2, h3, h4 {
        text-align: center;
    }

    & p {
        margin: 2rem 0;
    }

    @media (max-width: 768px) {
        margin: 2rem 1rem;
        width: unset;
    }
`