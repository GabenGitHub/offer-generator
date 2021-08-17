import { Dispatch, SetStateAction, useState } from "react";
import { AreaProperties } from "./models/area-properties";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Footer from "./components/Footer";
import Table from "./components/Table";
import Form from "./components/Form";
import Map from "./components/Map";
import Header from "./components/Header";
import { LeafletMouseEvent } from "leaflet";

const App: React.FC = () => {
    
    const [selectedAreas, setSelectedAreas]: [AreaProperties[], Dispatch<SetStateAction<AreaProperties[]>>] = useState<AreaProperties[]>([]);
    
    const updateState = (event: LeafletMouseEvent) => {
        setSelectedAreas(select => [...select, event.target.feature.properties]);
    };

    const removeArea = (area: AreaProperties): any => {
        const newArr = selectedAreas.filter(a => a.megye !== area.megye);
        setSelectedAreas(newArr);
    };

    return (
        <>
            <Header />
            <div className="App">
                <Map updateState={updateState}/>
                <Table selectedAreas={selectedAreas} removeArea={removeArea} />
                <Form selectedAreas={selectedAreas} />
            </div>
            <Footer />
        </>
    );
};

export default App;
