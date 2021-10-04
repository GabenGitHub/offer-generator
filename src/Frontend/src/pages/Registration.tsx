import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { FromContainer, StyledForm } from "../components/Form.style";
import Input from "../components/Input";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";
import { useTranslation } from 'react-i18next';

const Registration = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isRegistered, setisRegistered] = useState(false);
  const { t } = useTranslation();


  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (password !== password2) {
      return;
    }

    const response = await axios({
      method: "POST",
      data: {
        name,
        email,
        password,
      },
      withCredentials: true,
      url: "/api/register",
    });
    try {
      const data = await response;
      if (data.status === 201) {
        setisRegistered(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isRegistered) {
    return <Redirect to="/login" />;
  }

  return (
      <>
          <Menu />
          <FromContainer>
              <StyledForm onSubmit={handleSubmit}>
                  <Input
                      required
                      label={`${t('registration.name')}*`}
                      placeholder={t('registration.name')}
                      handleChange={({ target: { value } }: any) =>
                          setName(value)
                      }
                      value={name}
                  />
                  <Input
                      required
                      label={`${t('registration.email')}*`}
                      placeholder={t('registration.email')}
                      handleChange={({ target: { value } }: any) =>
                          setEmail(value)
                      }
                      type="email"
                      value={email}
                  />
                  <Input
                      required
                      type="password"
                      label={`${t('registration.password')}*`}
                      placeholder={t('registration.password')}
                      handleChange={({ target: { value } }: any) =>
                          setPassword(value)
                      }
                      value={password}
                  />
                  <Input
                      required
                      type="password"
                      label={`${t('registration.repeatPassword')}*`}
                      placeholder={t('registration.repeatPassword')}
                      handleChange={({ target: { value } }: any) =>
                          setPassword2(value)
                      }
                      value={password2}
                  />
                  <SubmitButton value={t('registration.registration')} />
              </StyledForm>
          </FromContainer>
      </>
  );
};

export default Registration;
