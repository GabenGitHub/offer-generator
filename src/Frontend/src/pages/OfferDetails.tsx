import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { FromContainerMain, StyledForm } from "../components/Form.style";
import Input from "../components/Input";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";
import { ResponsiveAreas, ResponsiveOfferDetails, StyledTableResponsive } from "../components/Table.style";
import TextArea from "../components/TextArea";
import { AreaProperties } from "../models/area-properties";
import { formatDate, formatNumberWithCommas } from "../utils/utils";
import { DetailsContainer } from "./OfferDetails.style";

const OfferDetails = () => {
    const { id } = useParams<any>();
    const [offer, setOffer] = useState<any>({});
    const [message, setMessage] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [deleted, setDeleted] = useState<boolean>(false);

    useEffect(() => {
        const getOffer = async () => {
            try {
                const response = await axios.get(`/api/offer/${id}`);
                setOffer(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const countTotalPrice = () => {
            if (!offer.amount) {
                return;
            }
            const result = (price) * offer.amount;
            setTotalPrice(result);
        }

        getOffer();
        countTotalPrice();
    }, [id, price, offer.amount]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("Ajánlat küldése emailben")
    };

    const onDelete = async () => {
        try {
            const response = await axios.delete(`/api/offer/${id}`);
            if (response.status === 200) {
                setDeleted(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (deleted) {
        return <Redirect to="/admin" />;
    }

    return (
        <>
            <Menu />
            <DetailsContainer>
                <h1>Ajánlat részletei</h1>
                <StyledTableResponsive>
                    <thead>
                        <tr>
                            <th data-form="Ceg">Cég</th>
                            <th>Név</th>
                            <th>E-mail</th>
                            <th>Mennyiség</th>
                            <th>Dátum</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ResponsiveOfferDetails>
                            <td>{offer?.company}</td>
                            <td>{offer?.name}</td>
                            <td>{offer?.email}</td>
                            <td>{formatNumberWithCommas(offer?.amount)}</td>
                            <td>{formatDate(offer?.date)}</td>
                        </ResponsiveOfferDetails>
                    </tbody>
                </StyledTableResponsive>
            </DetailsContainer>
            <DetailsContainer>
                <h2>Területek</h2>
                <StyledTableResponsive>
                    <thead>
                        <tr>
                            <th>Terület</th>
                            <th colSpan={2}>Népesség</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offer?.areas?.map((area: AreaProperties) => 
                                (
                                    <ResponsiveAreas key={area._id}>
                                        <td>{area.name}</td>
                                        <td>{formatNumberWithCommas(area.population)} fő</td>
                                    </ResponsiveAreas>
                                )
                            )
                        }
                    </tbody>
                </StyledTableResponsive>
            </DetailsContainer>
            <DetailsContainer>
                <h2>Üzenet</h2>
                <p>{offer?.message}</p>
            </DetailsContainer>
            <DetailsContainer>
                <h2>Műveletek</h2>
                <SubmitButton value="Ajánlat törlése" onClick={onDelete} />
            </DetailsContainer>
            <FromContainerMain>
                <StyledForm onSubmit={handleSubmit}>
                    <Input
                    required
                    label="Ár/db*"
                    placeholder="Ft/db"
                    handleChange={({ target: { value } }: any) => {
                        setPrice(value);
                    }}
                    value={price}
                    />
                    <TextArea
                    label="Egyéb megjegyzés"
                    handleChange={({ target: { value } }: any) => setMessage(value)}
                    type="textarea"
                    value={message}
                    />
                    <h2>Teljes ár: {formatNumberWithCommas(totalPrice?? 0)} Ft</h2>
                    <SubmitButton value="Ajánlat küldése" />
                </StyledForm>
            </FromContainerMain>
        </>
    )
}

export default OfferDetails
