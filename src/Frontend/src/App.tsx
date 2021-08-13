import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Feature, Geometry } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLngExpression, Layer, LeafletMouseEvent } from "leaflet";

import hungary from "./data/counties.json"

import logo from "./assets/images/logo-b.png";
import "./App.css";
import "leaflet/dist/leaflet.css";

const App: React.FC = () => {
    const [counties, setCounties]: any = useState<GeoJSON.FeatureCollection<any>>();
    const [select, setSelect]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>(["test"]);

    useEffect(() => {
        setCounties(hungary);
    }, []);

    const onAreaClick = (event: LeafletMouseEvent) => {
        event.target.setStyle({
            color: "red",
            fillColor: "red"
        });

        const area = event.target.feature.properties.megye;
        console.log(event.target.feature.properties.megye)
        // TODO: not saving into the state
        setSelect(select => [...select, area]);
        console.log(select)
    };
    

    const onEachArea = (area: Feature<Geometry, any>, layer: Layer) => {
        layer.on({
            click: onAreaClick,
            mouseover: (event: LeafletMouseEvent) => {
                const areaName: string = event.target.feature.properties.megye;
                const population: number = event.target.feature.properties.population;
                layer.bindPopup(`${areaName}: ${population} fő`).openPopup();
            },
        });
    };

    const position: LatLngExpression = [47.181, 18.990];

    return (
        <>
            <header className="App-header">
                <img src={logo} alt="logo" />
            </header>
            <div className="App">
                <h1>Árajánlat</h1>
                <MapContainer  className="map-container" center={position} zoom={8} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <GeoJSON 
                        key='my-geojson'
                        data={counties} 
                        onEachFeature={onEachArea}
                    />
                </MapContainer>
            </div>
        </>
    );
};

export default App;
