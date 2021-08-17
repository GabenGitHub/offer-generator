import { StyledTextArea } from "./Input.style"

const TextArea = ({ label, value, handleChange, type="text", rows=10, cols=30, ...rest }: any) => {
    return (
        <>
            <label>{label}</label>
            <StyledTextArea rows={rows} cols={cols} onChange={handleChange} placeholder={label}/>
        </>
    )
}

export default TextArea
