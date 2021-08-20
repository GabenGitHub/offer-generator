import axios from "axios";
import { useState } from "react";
import { FromContainerAuth, StyledForm } from "../components/Form.style";
import Input from "../components/Input";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await axios({
      method: "POST",
      data: {
        email,
        password,
      },
      withCredentials: true,
      url: "/api/login",
    });
    const data = await response;
    // TODO: remove log, set user to the context
    console.log(data);
  };

  return (
    <>
      <Menu />
      <FromContainerAuth>
        <StyledForm onSubmit={handleSubmit}>
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
          <SubmitButton value="Bejelentkezés" />
        </StyledForm>
      </FromContainerAuth>
    </>
  );
};

export default Login;
