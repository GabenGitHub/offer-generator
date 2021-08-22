import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FromContainerMain, StyledForm } from "../components/Form.style";
import Input from "../components/Input";
import Menu from "../components/Menu";
import SubmitButton from "../components/SubmitButton";
import { StyledTable } from "../components/Table.style";
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
            const result = (price ?? 0) * offer?.amount;
            setTotalPrice(result);
        }

        getOffer();
        countTotalPrice();
    }, [id, price, offer.amount]);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("Ajánlat küldése emailben")
    };



    const onDelete = () => {
        // TODO: implement
        console.log("törlés")
    }

    return (
        <>
            <Menu />
            <DetailsContainer>
                <h1>Ajánlat részletei</h1>
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Cég</th>
                            <th>Név</th>
                            <th>E-mail</th>
                            <th>Mennyiség</th>
                            <th>Dátum</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{offer?.company}</td>
                            <td>{offer?.name}</td>
                            <td>{offer?.email}</td>
                            <td>{formatNumberWithCommas(offer?.amount)}</td>
                            <td>{formatDate(offer?.date)}</td>
                        </tr>
                    </tbody>
                </StyledTable>
            </DetailsContainer>
            <DetailsContainer>
                <h2>Területek</h2>
                <StyledTable>
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
                                    <tr key={area._id}>
                                        <td>{area.name}</td>
                                        <td>{formatNumberWithCommas(area.population)} fő</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </StyledTable>
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
                    handleChange={({ target: { value } }: any) => setPrice(value)}
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
