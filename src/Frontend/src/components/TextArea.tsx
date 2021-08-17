import { StyledLabel, StyledTextArea } from "./Input.style"

const TextArea = ({ label, value, handleChange, type="text", rows=10, cols=30, ...rest }: any) => {
    return (
        <>
            <StyledLabel>{label}</StyledLabel>
            <StyledTextArea rows={rows} cols={cols} onChange={handleChange} placeholder={label}/>
        </>
    )
}

export default TextArea
