import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from "leaflet";

import hungary from "./data/counties.json"

import logo from "./assets/images/logo-b.png";
import "./App.css";
import "leaflet/dist/leaflet.css";

const App: React.FC = () => {
    useEffect(() => {
        console.log(hungary);
    }, [])

    const position: LatLngExpression = [47.481, 18.990]

    return (
        <>
            <header className="App-header">
                <img src={logo} alt="logo" />
            </header>
            <div className="App">
                <h1>Árajánlat</h1>
                <MapContainer  className="map-container" center={position} zoom={7} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    );
}

export default App;
