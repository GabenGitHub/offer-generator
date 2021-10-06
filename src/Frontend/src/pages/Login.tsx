import axios, { AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FromContainer, StyledForm } from "../components/Form.style";
import Input from "../components/Input";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";
import { UserContext } from "../context/contexts";
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setUser } = useContext<any>(UserContext);
  const { t } = useTranslation();

  const history = useHistory();
  const location = useLocation();
  // @ts-ignore
  const { from } = location.state || { from: { pathname: "/admin" } };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

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
              <StyledForm onSubmit={handleSubmit}>
                  <Input
                      required
                      label={`${t('login.email')}*`}
                      placeholder={t('login.email')}
                      handleChange={({ target: { value } }: any) =>
                          setEmail(value)
                      }
                      type="email"
                      value={email}
                  />
                  <Input
                      required
                      type="password"
                      label={`${t('login.password')}*`}
                      placeholder={t('login.password')}
                      handleChange={({ target: { value } }: any) =>
                          setPassword(value)
                      }
                      value={password}
                  />
                  <SubmitButton value={t('login.login')} />
              </StyledForm>
          </FromContainer>
      </>
  );
};

export default Login;
