import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { FromContainerAuth, StyledForm } from "../components/Form.style";
import Input from "../components/Input";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";

const Registration = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [isRegistered, setisRegistered] = useState(false);

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
    const data = await response;
    setisRegistered(true);
    // TODO: remove log
    console.log(data);

  };

  if (isRegistered) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Menu />
      <FromContainerAuth>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            required
            label="Név*"
            placeholder="Név"
            handleChange={({ target: { value } }: any) => setName(value)}
            value={name}
          />
          <Input
            required
            label="E-mail cím*"
            placeholder="E-mail cím"
            handleChange={({ target: { value } }: any) => setEmail(value)}
            type="email"
            value={email}
          />
          <Input
            required
            type="password"
            label="Jelszó*"
            placeholder="Jelszó"
            handleChange={({ target: { value } }: any) => setPassword(value)}
            value={password}
          />
          <Input
            required
            type="password"
            label="Jelszó ismétlése*"
            placeholder="Jelszó"
            handleChange={({ target: { value } }: any) => setPassword2(value)}
            value={password2}
          />
          <SubmitButton value="Regisztrálás" />
        </StyledForm>
      </FromContainerAuth>
    </>
  );
};

export default Registration;
