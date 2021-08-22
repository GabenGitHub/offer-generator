import Menu from "../components/Menu"
import { ThankyouContainer } from "./Thanking.style"

const Thanking = () => {
    return (
        <>
            <Menu />
            <ThankyouContainer>
                <div>
                    <h1>Köszönjük a megkeresést!</h1>
                    <h2>Ajánlat kérését megkaptuk.</h2>
                    <h2>Hamarosan küldjük az ajánlatot.</h2>
                </div>
            </ThankyouContainer>
        </>
    )
}

export default Thanking
