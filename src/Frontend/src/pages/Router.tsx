import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthProtection from "../components/AuthProtection";
import { UserProvider } from "../context/UserProvider";
import Admin from "./Admin";
import Home from "./Home";
import Login from "./Login";
import OfferDetails from "./OfferDetails";
import Registration from "./Registration";
import Thanking from "./Thanking";
import UserDetails from "./UserDetails";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <UserProvider>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/registration">
                        <Registration />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/thankyou">
                        <Thanking />
                    </Route>
                    <Route exact path="/admin">
                        <AuthProtection>
                            <Admin />
                        </AuthProtection>
                    </Route>
                    <Route exact path="/offer/:id">
                        <AuthProtection>
                            <OfferDetails />
                        </AuthProtection>
                    </Route>
                    <Route exact path="/user/:id">
                        <AuthProtection>
                            <UserDetails />
                        </AuthProtection>
                    </Route>
                </UserProvider>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
