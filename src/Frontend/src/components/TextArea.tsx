import { StyledLabel, StyledTextArea } from "./Input.style"

const TextArea = ({ label, value, handleChange, type="text",...rest }: any) => {
    return (
        <>
            <StyledLabel>{label}</StyledLabel>
            <StyledTextArea onChange={handleChange} placeholder={label}/>
        </>
    )
}

export default TextArea
