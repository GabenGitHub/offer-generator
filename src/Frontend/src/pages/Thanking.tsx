import Menu from "../components/Menu"
import { ThankyouContainer } from "./Thanking.style"
import { useTranslation } from 'react-i18next';

const Thanking = () => {
    const { t } = useTranslation();
    return (
        <>
            <Menu />
            <ThankyouContainer>
                <div>
                    <h1>{t('thanking.thankYou')}</h1>
                    <h2>{t('thanking.received')}</h2>
                    <h2>{t('thanking.sending')}</h2>
                </div>
            </ThankyouContainer>
        </>
    );
}

export default Thanking
