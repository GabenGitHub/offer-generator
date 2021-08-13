import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Feature, Geometry } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLngExpression, Layer, LeafletMouseEvent } from "leaflet";

import { AreaProperties } from "./models/area-properties";
import { version } from '../package.json';

import hungary from "./data/counties.json"

import logo from "./assets/images/logo-b.png";
import "./App.css";
import "leaflet/dist/leaflet.css";

const App: React.FC = () => {
    const [counties, setCounties]: any = useState<GeoJSON.FeatureCollection<any>>();
    const [selectedAreas, setselectedAreas]: [AreaProperties[], Dispatch<SetStateAction<AreaProperties[]>>] = useState<AreaProperties[]>([]);

    useEffect(() => {
        setCounties(hungary);
    }, []);

    const onClickArea = (event: LeafletMouseEvent) => {
        event.target.setStyle({
            color: "red",
            fillColor: "red"
        });
        
        const area: AreaProperties = event.target.feature.properties;
        setselectedAreas(select => [...select, area]);
    };

    const onMouseOverArea = (event: LeafletMouseEvent) => {
        const areaName: string = event.target.feature.properties.megye;
        event.target.bindPopup(`${areaName}`).openPopup()
    };

    const onEachArea = (area: Feature<Geometry, any>, layer: Layer) => {
        layer.on({
            click: onClickArea,
            mouseover: onMouseOverArea,
        });
    };

    const position: LatLngExpression = [47.170, 18.990];

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
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Terület</th>
                                <th>Népesség</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            selectedAreas.map((area: AreaProperties, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{area.megye}</td>
                                        <td>{area.population}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <ul>
                    </ul>
                </div>
            </div>
            <div>v{version}</div>
        </>
    );
};

export default App;
