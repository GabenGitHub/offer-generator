import axios, { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FromContainer, StyledForm } from "../components/Form.style";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";
import { UserContext } from "../context/contexts";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setUser } = useContext<any>(UserContext);
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const onError = (errors: any, e: any) => console.log(errors, e);

  const history = useHistory();
  const location = useLocation();
  // @ts-ignore
  const { from } = location.state || { from: { pathname: "/admin" } };

  const handleFormSubmit = async (e: any) => {
    const response: AxiosResponse<any> = await axios({
      method: "POST",
      data: {
        email,
        password,
      },
      withCredentials: true,
      url: "/api/login",
    });

    try {
      const user = await response.data.user;
      setUser(user);
      history.replace(from);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu />
      <FromContainer>
        <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
          <StyledForm>
            <label htmlFor="email">{`${t("login.email")}*`}</label>
            <input
              placeholder={t("login.email")}
              {...register("email", {
                required: `${t("form.errorRequired")}`,
                pattern: {
                  value: /^[a-z0-9._-]+@[a-z0-9.]+\.[a-z]{1,4}$/i,
                  message: `${t("form.errorEmail")}`,
                },
              })}
              onChange={({ target: { value } }: any) => setEmail(value)}
              type="email"
              value={email}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <label htmlFor="password">{`${t("registration.password")}*`}</label>
            <input
              required
              type="password"
              placeholder={t("login.password")}
              onChange={({ target: { value } }: any) => setPassword(value)}
              value={password}
            />
            <SubmitButton value={t("login.login")} />
          </StyledForm>
        </form>
      </FromContainer>
    </>
  );
};

export default Login;
