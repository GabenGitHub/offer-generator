import { DetailsContainer } from "../pages/OfferDetails.style"
import { formatFloatNumberWithCommas, formatNumberWithCommas } from "../utils/utils"
import { useTranslation } from "react-i18next";
import { StyledTable } from "./Table.style"

const Offer = ({ offer }: any) => {
    const { t } = useTranslation();
    return (
        <DetailsContainer>
            <h2>{t('offer.offer')}</h2>
            <StyledTable>
                <thead>
                    <tr>
                        <th>{t('offer.quantity')}</th>
                        <th>{t('offer.pricePerPiece')}</th>
                        <th>{t('offer.totalPrice')}</th>
                    </tr>
                </thead>
                <tbody>
                    <td>{`${formatNumberWithCommas(offer.amount)} ${t(
                        'offer.pcs'
                    )}`}</td>
                    <td>{`${formatFloatNumberWithCommas(offer.pricePerPc)} ${t(
                        'offer.ft'
                    )}`}</td>
                    <td>{`${formatNumberWithCommas(offer.totalPrice)} ${t(
                        'offer.ft'
                    )}`}</td>
                </tbody>
            </StyledTable>
            <DetailsContainer>
                <h3>{t('offer.response')}</h3>
                <p>{offer.myMessage}</p>
            </DetailsContainer>
        </DetailsContainer>
    );
}

export default Offer
