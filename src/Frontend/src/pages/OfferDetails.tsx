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
import { Status } from "../models/statusEnum";
import Offer from "../components/Offer";

const OfferDetails = () => {
    const { id } = useParams<any>();
    const [offer, setOffer] = useState<any>({});
    const [myMessage, setMyMessage] = useState<string>("");
    const [deleted, setDeleted] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [pricePerPc, setPricePerPc] = useState<number>(0);
    const [sent, setSent] = useState<boolean>(false);

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
            const result = pricePerPc * offer.amount;
            setTotalPrice(Math.floor(result));
        }

        getOffer();
        countTotalPrice();
    }, [id, pricePerPc, offer.amount]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.put(`/api/offer/${id}`, {
            method: "PUT",
            data: {
                status: Status.PROCESSED,
                totalPrice,
                pricePerPc,
                myMessage,
            },
            withCredentials: true,
        });
    
        try {
            if (response.status === 200) {
                setSent(true);
            }
        } catch (error) {
            console.log(error);      
        }

        // TODO: send email
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

    if (deleted || sent) {
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
            
            {
                offer?.status !== Status.UNPROCESSED ? <Offer offer={offer} /> : null
            }

            <DetailsContainer>
                <h2>Műveletek</h2>
                <SubmitButton value="Ajánlat törlése" onClick={onDelete} />
            </DetailsContainer>

            <FromContainerMain>
                <StyledForm onSubmit={handleSubmit}>
                <h2>Ajánlat adása</h2>
                    <Input
                    required
                    label="Ár/db*"
                    placeholder="Ft/db"
                    handleChange={({ target: { value } }: any) => setPricePerPc(parseFloat(value))}
                    value={pricePerPc}
                    />
                    <TextArea
                    label="Egyéb megjegyzés"
                    handleChange={({ target: { value } }: any) => setMyMessage(value)}
                    type="textarea"
                    value={myMessage}
                    />
                    <h2>Teljes ár: {formatNumberWithCommas(!totalPrice ? 0 : totalPrice)} Ft</h2>
                    {
                        offer.status === Status.PROCESSED ? <SubmitButton value="Új ajánlat küldése"/> : <SubmitButton value="Ajánlat küldése" />
                    }
                </StyledForm>
            </FromContainerMain>
        </>
    )
}

export default OfferDetails
