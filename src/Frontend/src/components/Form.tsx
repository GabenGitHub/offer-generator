import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import TextArea from "./TextArea";
import { FormAction, FromContainerMain, Icon, StyledForm } from "./Form.style";
import arrow from "../assets/images/up-arrow.svg";
import { SelectedAreaContext } from "../context/contexts";
import SubmitButton from "./SubmitButton";
import { Redirect } from "react-router-dom";
import { formatNumberWithCommas } from "../utils/utils";
import { useTranslation } from 'react-i18next';

const Form: React.FC<any> = () => {
  const { selectedAreas } = useContext<any>(SelectedAreaContext);
  const { t } = useTranslation();

  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [success, setSuccess] = useState<boolean>(false);

  const countAmount = (selectedAreas: any[]) => {
    const defaultAmount = selectedAreas.reduce((sum: number, area: any) => sum + area.mailbox, 0);
    setAmount(defaultAmount);
  };

  useEffect(() => {
    countAmount(selectedAreas);
  }, [selectedAreas])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (selectedAreas.length === 0) {
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
        amount,
      },
      url: "/api/offer",
    });

    try {
      const data = await response;
      if (data.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (success) {
    return <Redirect to="/thankyou" />;
  }

  if (selectedAreas.length !== 0) {
    return (
        <>
            <FromContainerMain>
                <StyledForm onSubmit={handleSubmit}>
                    <Input
                        required
                        label={`${t('form.name')}*`}
                        placeholder={t('form.name')}
                        handleChange={({ target: { value } }: any) =>
                            setName(value)
                        }
                        value={name}
                    />
                    <Input
                        required
                        label={`${t('form.companyName')}*`}
                        placeholder={t('form.companyName')}
                        handleChange={({ target: { value } }: any) =>
                            setCompany(value)
                        }
                        value={company}
                    />
                    <Input
                        required
                        label={`${t('form.email')}*`}
                        placeholder={t('form.email')}
                        handleChange={({ target: { value } }: any) =>
                            setEmail(value)
                        }
                        type="email"
                        value={email}
                    />
                    <Input
                        type="number"
                        label={t('form.quantity')}
                        placeholder={`${t(
                            'form.default'
                        )} ${formatNumberWithCommas(amount ?? 0)} ${t(
                            'form.pcs'
                        )}`}
                        handleChange={({ target: { value } }: any) =>
                            setAmount(value)
                        }
                        value={amount}
                    />
                    <TextArea
                        label={t('form.other')}
                        handleChange={({ target: { value } }: any) =>
                            setMessage(value)
                        }
                        type="textarea"
                        value={message}
                    />
                    <SubmitButton value={t('form.submit')} />
                </StyledForm>
            </FromContainerMain>
        </>
    );
  }
  return (
    <FormAction>
      <Icon src={arrow} alt="up arrow" />
      <h2>{t("form.selectTerritory")}</h2>
    </FormAction>
  );
};

export default Form;
