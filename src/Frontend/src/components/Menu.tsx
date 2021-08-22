import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/contexts";

const Menu = () => {
    const history = useHistory();
    const { user, setUser } = useContext<any>(UserContext);

    const [openNavbar, setOpenNavbar] = useState<boolean>(false);

    const toggleClass = () => {
        if (!openNavbar) {
            setOpenNavbar(true);
        } else {
            setOpenNavbar(false);
        }
    };

    const openNavbarClass: string = openNavbar ? "open" : "";
    const navbarClasses: string = `${openNavbarClass}`;
    
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
                        <div className={`menu-btn-burger black`}></div>
                    </button>
                    <button className="nav-main" onClick={() => history.push(`/`)}>Főoldal</button>
                </div>
                <div
                    className={openNavbar ? "nav-links show-links" : "nav-links"}
                    id="nav-links"
                >
                    {
                        user && (
                            <>
                                <h4 className="nav-link" >Üdv {user.name}</h4>

                                <button className="nav-link" onClick={() =>
                                    fetch("/api/logout")
                                        .then((res) => res.json())
                                        .then((data) => setUser())
                                        .catch((err) => console.error(err))}>Kijelentkezés</button>
                                <button className="nav-link" onClick={() => history.push(`/admin`)}>Adminisztráció</button>
                            </>
                        )
                    }
                    {
                        !user && (
                            <>
                                <button className="nav-link" onClick={() => history.push(`/login`)}>Bejelentkezés</button>
                                <button className="nav-link" onClick={() => history.push(`/registration`)}>Regisztrálás</button>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Menu;