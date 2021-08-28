import { StyledButton } from "./Button.style"

const Button = ({value, onClick, ...rest}: any) => {
    return (
        <StyledButton
            onClick={onClick}
            {...rest}
        >
        {value}
        </StyledButton>
    )
}


export default Button;
