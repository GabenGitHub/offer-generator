import { StyledInput, StyledLabel } from "./Input.style"

const Input = ({ label, value, handleChange, type="text", ...rest }: any) => {
    return (
        <>
            <StyledLabel>{label}</StyledLabel>
            <StyledInput type={type} onChange={handleChange} placeholder={label} {...rest}/>
        </>
    )
}

export default Input
