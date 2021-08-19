import { useState } from "react";
import { useHistory } from "react-router-dom";

const Menu = () => {
    const history = useHistory();

    const [openNavbar, setOpenNavbar] = useState<boolean>(false);
    const [fixedNavbar] = useState<boolean>(false);
    const [navbarColor] = useState<string>("black");

    const toggleClass = () => {
        if (!openNavbar) {
            setOpenNavbar(true);
        } else {
            setOpenNavbar(false);
        }
    };

    const openNavbarClass: string = openNavbar ? "open" : "";
    const fixedNavbarClass: string = fixedNavbar ? "fixed" : "";
    const navbarClasses: string = `${openNavbarClass} ${fixedNavbarClass}`;
    
    return (
        <nav className={`navbar ${navbarClasses}`} id="navbar">
            <div className="nav-center">
                <div className="nav-header">
                    <button
                        type="button"
                        className={`nav-toggle ${openNavbarClass}`}
                        id="nav-toggle"
                        aria-label="nav toggler"
                        onClick={() => toggleClass()}
                    >
                        <div className={`menu-btn-burger ${navbarColor}`}></div>
                    </button>
                    <button className="nav-link" onClick={() => history.push(`/`)}>Főoldal</button>
                </div>
                <div
                    className={openNavbar ? "nav-links show-links" : "nav-links"}
                    id="nav-links"
                >
                    <button className="nav-link" onClick={() => history.push(`/login`)}>Bejelentkezés</button>
                    <button className="nav-link" onClick={() => history.push(`/registration`)}>Regisztrálás</button>
                    <button className="nav-link" onClick={() => history.push(`/admin`)}>Adminisztráció</button>
                </div>
            </div>
        </nav>
    )
}

export default Menu;