import { DetailsContainer } from "../pages/OfferDetails.style"
import { formatFloatNumberWithCommas, formatNumberWithCommas } from "../utils/utils"
import { StyledTable } from "./Table.style"

const Offer = ({ offer }: any) => {
    return (
        <DetailsContainer>
            <h2>Adott ajánlat</h2>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Mennyiség</th>
                        <th>Ár/db</th>
                        <th>Teljes ár</th>
                    </tr>
                </thead>
                <tbody>
                    <td>{`${formatNumberWithCommas(offer.amount)} db`}</td>
                    <td>{`${formatFloatNumberWithCommas(offer.pricePerPc)} Ft`}</td>
                    <td>{`${formatNumberWithCommas(offer.totalPrice)} Ft`}</td>
                </tbody>
            </StyledTable>
            <DetailsContainer>
                <h3>Válasz</h3>
                <p>{offer.myMessage}</p>
            </DetailsContainer>
        </DetailsContainer>
    )
}

export default Offer
