import React, { useState, useContext, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FormAction, FromContainerMain, Icon, StyledForm } from './Form.style';
import arrow from '../assets/images/up-arrow.svg';
import { SelectedAreaContext } from '../context/contexts';
import SubmitButton from './SubmitButton';
import { Redirect } from 'react-router-dom';
import { formatNumberWithCommas } from '../utils/utils';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

export const Form: React.FC<any> = () => {
    const { selectedAreas } = useContext<any>(SelectedAreaContext);
    const { t } = useTranslation();
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useFormContext();

    const [name, setName] = useState<string>('');
    const [company, setCompany] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [maxAmount, setMaxAmount] = useState<number>();
    const [amount, setAmount] = useState<number>();
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        countAmount(selectedAreas);
    }, [selectedAreas]);

    const countAmount = (selectedAreas: any[]) => {
        const defaultAmount = selectedAreas.reduce(
            (sum: number, area: any) => sum + area.mailbox,
            0
        );
        setMaxAmount(defaultAmount);
    };

    const onError = (errors: any, e: any) => console.log(errors, e);

    const checkAmount = () => amount ? amount : maxAmount;

    const handleFormSubmit = async (data: any, e: any) => {
        e.preventDefault();

        if (selectedAreas.length === 0) {
            return;
        }

        const response: AxiosResponse<any> = await axios({
            method: 'POST',
            data: {
                areas: selectedAreas,
                name,
                company,
                email,
                message,
                amount: checkAmount(),
            },
            url: '/api/offer',
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
                    <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
                        <StyledForm>
                            <label htmlFor="name">{`${t('form.name')}*`}</label>

                            <input
                                placeholder={t('form.name')}
                                {...register('name', {
                                    required: `${t('form.errorRequired')}`,
                                    pattern: {
                                        value: /^[a-záéíóöőúüűäæåø\s-]*$/i,
                                        message: `${t(
                                            'form.errorSpecialChar'
                                        )}`,
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
                            <label htmlFor="company">{`${t(
                                'form.companyName'
                            )}*`}</label>

                            <input
                                placeholder={t('form.companyName')}
                                {...register('company', {
                                    required: `${t('form.errorRequired')}`,
                                    pattern: {
                                        value: /^[^*|":<>[\]!+{}`\\()';@&$]+$/,
                                        message: `${t(
                                            'form.errorSpecialChar'
                                        )}`,
                                    },
                                })}
                                name="company"
                                onChange={({ target: { value } }: any) =>
                                    setCompany(value)
                                }
                            />
                            {errors.company && <p>{errors.company.message}</p>}
                            <label htmlFor="email">{`${t(
                                'form.email'
                            )}*`}</label>

                            <input
                                placeholder={t('form.email')}
                                {...register('email', {
                                    required: `${t('form.errorRequired')}`,
                                    pattern: {
                                        value: /^[a-z0-9._-]+@[a-z0-9.]+\.[a-z]{1,4}$/i,
                                        message: `${t('form.errorEmail')}`,
                                    },
                                })}
                                name="email"
                                onChange={({ target: { value } }: any) =>
                                    setEmail(value)
                                }
                            />
                            {errors.email && <p>{errors.email.message}</p>}

                            <label htmlFor="amount">{`${t(
                                'form.quantity'
                            )}*`}</label>

                            <input
                                placeholder={`${t(
                                    'form.default'
                                )} ${formatNumberWithCommas(
                                    maxAmount ?? 0
                                )} ${t('form.pcs')}`}
                                {...register('amount', {
                                    min: {
                                        value: 1,
                                        message: `${t('form.errorLess')}`,
                                    },
                                    max: {
                                        value: maxAmount as number,
                                        message: `${t('form.errorMore')}`,
                                    },
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: `${t('form.errorDigitsOnly')}`,
                                    },
                                })}
                                name="amount"
                                onChange={({ target: { value } }: any) =>
                                    setAmount(value)
                                }
                            />
                            {errors.amount && <p>{errors.amount.message}</p>}
                            <label htmlFor="message">{`${t(
                                'form.other'
                            )}`}</label>
                            <textarea
                                onChange={({ target: { value } }: any) =>
                                    setMessage(value)
                                }
                                name="message"
                                value={message}
                            />
                            <SubmitButton value={t('form.submit')} />
                        </StyledForm>
                    </form>
                </FromContainerMain>
            </>
        );
    }
    return (
        <FormAction>
            <Icon src={arrow} alt="up arrow" />
            <h2>{t('form.selectTerritory')}</h2>
        </FormAction>
    );
};

export default Form;
