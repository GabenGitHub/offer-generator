import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/contexts";

const AuthProtection = ({ children, reversed }: any) => {
    const { user } = useContext<any>(UserContext);

    if (reversed && user) {
        return <Redirect to="/admin" />;
    }

    if (!reversed && !user) {
        return <Redirect to="/" />;
    }

    return <>{children}</>;
};

export default AuthProtection;
