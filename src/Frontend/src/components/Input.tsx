import { StyledInput, StyledLabel } from "./Input.style"

const Input = ({ label, value, handleChange, type="text", placeholder, ...rest }: any) => {
    return (
        <>
            <StyledLabel>{label}</StyledLabel>
            <StyledInput type={type} onChange={handleChange} placeholder={placeholder} {...rest}/>
        </>
    )
}

export default Input
