import styled from 'styled-components';
import Menu from './Menu';

export const StyledNav = styled(Menu)`
    width: 100%;

    & nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 2rem;
    }
`