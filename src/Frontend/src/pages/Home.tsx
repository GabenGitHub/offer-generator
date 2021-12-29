import "../App.css";
import "leaflet/dist/leaflet.css";
import Table from "../components/Table";
import Form from "../components/Form";
import Map from "../components/Map";
import Header from "../components/Header";
import { SelectedAreaProvider } from "../context/SelectedAreaProvider";
import Menu from "../components/Menu";
import { FormProvider, useForm } from "react-hook-form";

const Home = () => {

    const methods = useForm({ mode: 'all' });

    return (
        <SelectedAreaProvider>
            <Menu />
            <Header />
            <div className="App">
                <Map />
                <Table />
                <FormProvider {...methods}>
                    <Form />
                </FormProvider>
            </div>
        </SelectedAreaProvider>
    );
}

export default Home
