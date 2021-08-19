import { useState, useContext } from "react";
import axios from "axios";
import Input from "./Input";
import TextArea from "./TextArea";
import { FormAction, FromContainer, Icon, StyledForm } from "./Form.style";
import arrow from "../assets/images/up-arrow.svg";
import { SelectedAreaContext } from "../context/SelectedAreaContext";
import SubmitButton from "./SubmitButton";

const Form: React.FC<any> = () => {
    const { selectedAreas } = useContext<any>(SelectedAreaContext)

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
                        <Input required label="Név*" placeholder="Név" handleChange={({ target: { value }}: any) => setName(value)} value={name} />
                        <Input required label="Cég név*" placeholder="Cég név" handleChange={({ target: { value }}: any) => setCompany(value)} value={company} />
                        <Input required label="E-mail cím*" placeholder="E-mail cím" handleChange={({ target: { value }}: any) => setEmail(value)} type="email" value={email} />
                        <TextArea label="Egyéb megjegyzés" handleChange={({ target: { value }}: any) => setMessage(value)} type="textarea" value={message} />
                        <SubmitButton value="Ajánlat kérése" />
                    </StyledForm>
                </FromContainer>
            </>
        )
    }
    return (
        <FormAction>
            <Icon src={arrow} alt="up arrow" />
            <h2>Válasszon területet</h2>
        </FormAction>
    )
}

export default Form;
