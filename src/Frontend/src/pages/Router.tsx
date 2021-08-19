import { BrowserRouter, Switch, Route } from "react-router-dom";
import Admin from "./Admin";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
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
                    <Admin />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
