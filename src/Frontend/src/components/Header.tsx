import logo from "../assets/images/logo-b.png";
import { useTranslation } from 'react-i18next';


const Header = () => {
    const { t } = useTranslation();
    return (
        <header className="App-header center">
            <img src={logo} alt="logo" className="logo"/>
            <h1>{t('header.priceOffer')}</h1>
        </header>
    )
}

export default Header
