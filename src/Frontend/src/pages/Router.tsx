import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthProtection from "../components/AuthProtection";
import { UserProvider } from "../context/UserProvider";
import Admin from "./Admin";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";

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
                    <Route exact path="/admin">
                        <AuthProtection>
                            <Admin />
                        </AuthProtection>
                    </Route>
                </UserProvider>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
