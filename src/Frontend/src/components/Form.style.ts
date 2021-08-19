import styled from 'styled-components';

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 0.5rem;
`

export const FromContainer = styled.div`
    background-color: #EEEEEE;
    display: flex;
    justify-content: center;
`

export const FromContainerAuth = styled.div`
    background-color: #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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