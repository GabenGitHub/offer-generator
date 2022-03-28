import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { FromContainer, StyledForm } from "../components/Form.style";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";
import { useTranslation } from 'react-i18next';
import { useFormContext } from "react-hook-form";

const Registration = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isRegistered, setisRegistered] = useState(false);
  const { t } = useTranslation();
  const {
      register,
      formState: { errors },
      handleSubmit,
  } = useFormContext();

  const onError = (errors: any, e: any) => console.log(errors, e);

  const handleFormSubmit = async (e: any) => {

    if (password !== password2) {
      return;
    }

    const response: AxiosResponse<any> = await axios({
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
      const data = response;
      if (data.status === 201) {
        setisRegistered(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isRegistered) {
    console.log("registered email address")
    return <Redirect to="/login" />;
  }

  return (
      <>
          <Menu />
          <FromContainer>
              <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
                  <StyledForm>
                      <label htmlFor="name">{`${t(
                          'registration.name'
                      )}*`}</label>
                      <input
                          placeholder={t('registration.name')}
                          {...register('name', {
                              required: `${t('form.errorRequired')}`,
                              pattern: {
                                  value: /^[a-záéíóöőúüűäæåø\s-]*$/i,
                                  message: `${t('form.errorSpecialChar')}`,
                              },
                              minLength: {
                                  value: 3,
                                  message: `${t('form.errorLength')}`,
                              },
                          })}
                          name="name"
                          onChange={({ target: { value } }: any) =>
                              setName(value)
                          }
                      />
                      {errors.name && <p>{errors.name.message}</p>}
                      <label htmlFor="email">{`${t('registration.email')}*`}</label>
                      <input
                          placeholder={t('registration.email')}
                          {...register('email', {
                            required: `${t('form.errorRequired')}`,
                            pattern: {
                                value: /^[a-z0-9._-]+@[a-z0-9.]+\.[a-z]{1,4}$/i,
                                message: `${t('form.errorEmail')}`,
                            },
                        })}
                          onChange={({ target: { value } }: any) =>
                              setEmail(value)
                          }
                          type="email"
                          value={email}
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                      <label htmlFor="password">{`${t('registration.password')}*`}</label>
                      <input
                          type="password"
                          placeholder={t('registration.password')}
                          {...register('password', {
                            required: `${t('form.errorRequired')}`,
                            minLength: {
                                value: 6,
                                message: `${t('form.errorPassword')}`,
                            },
                        })}
                          onChange={({ target: { value } }: any) =>
                              setPassword(value)
                          }
                          value={password}
                      />
                      {errors.password && <p>{errors.password.message}</p>}
                      <label htmlFor="repeatPassword">{`${t('registration.repeatPassword')}*`}</label>
                      <input
                          type="password"
                          placeholder={t('registration.repeatPassword')}
                          {...register('password2', {
                            required: `${t('form.errorRequired')}`,
                            validate: value =>
                            value === password || `${t('form.passwordMatch')}`
                        })}
                          onChange={({ target: { value } }: any) =>
                              setPassword2(value)
                          }
                          value={password2}
                      />
                      {errors.password2 && <p>{errors.password2.message}</p>}
                      <SubmitButton value={t('registration.registration')} />
                  </StyledForm>
              </form>
          </FromContainer>
      </>
  );
};

export default Registration;
