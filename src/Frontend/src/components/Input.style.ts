import styled from 'styled-components';

export const StyledInput = styled.input`
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
`

export const StyledLabel = styled.label`
    padding: 0.5rem;
`

export const StyledTextArea = styled.textarea`
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
`