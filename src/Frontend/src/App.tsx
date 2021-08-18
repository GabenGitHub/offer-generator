import "./App.css";
import "leaflet/dist/leaflet.css";
import Footer from "./components/Footer";
import Table from "./components/Table";
import Form from "./components/Form";
import Map from "./components/Map";
import Header from "./components/Header";
import { SelectedAreaProvider } from "./context/SelectedAreaProvider";

const App: React.FC = () => {
    return (
        <>
            <SelectedAreaProvider>
                <Header />
                <div className="App">
                    <Map />
                    <Table />
                    <Form />
                </div>
                <Footer />
            </SelectedAreaProvider>
        </>
    );
};

export default App;
