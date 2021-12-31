import styled from 'styled-components';

export const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 0.5rem;

    & h2 {
        text-align: center;
        margin: 1rem 0;
    }

    p {
        color: red;
        margin-left: 1rem;
    }

    input {
        padding: 1rem;
        margin: 0 auto 1rem;
        max-width: 600px;
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
    }

    label {
        padding: 0.5rem;
    }

    textarea {
        padding: 1rem;
        margin: 0 auto;
        max-width: 600px;
        width: 100%;
        min-height: 200px;
        border-radius: 10px;
        border: 1px solid #e6e6e6;
        outline: none;
        resize: none;
        &:focus {
            border: 1px solid #6675df;
        }
        font-family: sans-serif;
        font-weight: 100;
        font-size: 1rem;
        line-height: 1.5;
    }
`;

export const FromContainerMain = styled.div`
    background-color: #EEEEEE;
    display: flex;
    justify-content: center;
`

export const FromContainer = styled.div`
    background-color: #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

export const FormAction = styled.div`
    text-align: center;
    margin: 2rem;
`
export const Icon = styled.img`
    height: 40px;
    margin-bottom: 10px;
    animation: slide 1s ease-in-out infinite;

    @keyframes slide {
        0%,
        100% {
            transform: translate(0, 10px);
        }
        
        50% {
            transform: translate(0, 0);
        }
    }
`