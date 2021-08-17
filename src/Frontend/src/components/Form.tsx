import { useState } from "react";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import TextArea from "./TextArea";
import { FromContainer, StyledForm } from "./Form.style";

const Form: React.FC<any> = ({selectedAreas}) => {
    const [name, setName] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (selectedAreas.length === 0) {
            // TODO: error handling
            return;
        }

        const response = await axios({
            method: "POST",
            data: {
              areas: selectedAreas,
              name,
              company,
              email,
              message,
            },
            // withCredentials: true,
            url: "/api/offer",
        });
        const data = await response.data;
        console.log(data);
    };

    if (selectedAreas.length !== 0) {
        return (
            <>
                <FromContainer>
                    <StyledForm onSubmit={handleSubmit}>
                        <Input label="Név" handleChange={({ target: { value }}: any) => setName(value)} value={name} />
                        <Input label="Cég" handleChange={({ target: { value }}: any) => setCompany(value)} value={company} />
                        <Input label="E-mail" handleChange={({ target: { value }}: any) => setEmail(value)} type="email" value={email} />
                        <TextArea label="Egyéb megjegyzés" handleChange={({ target: { value }}: any) => setMessage(value)} type="textarea" value={message} />
                        <Button value="Ajánlat kérése" />
                    </StyledForm>
                </FromContainer>
            </>
        )
    }
    return <><h2>Válasszon területet</h2></>
}

export default Form;
