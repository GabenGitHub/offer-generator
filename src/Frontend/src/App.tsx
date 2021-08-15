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
import axios from "axios";

const App: React.FC = () => {
    const [counties, setCounties]: any = useState<GeoJSON.FeatureCollection<any>>();
    const [selectedAreas, setselectedAreas]: [AreaProperties[], Dispatch<SetStateAction<AreaProperties[]>>] = useState<AreaProperties[]>([]);

    useEffect(() => {
        setCounties(hungary);
    }, [selectedAreas]);

    const onClickArea = (event: LeafletMouseEvent): void => {
        event.target.setStyle({
            color: "red",
            fillColor: "red"
        });

        event.target.feature.properties.selected = true;
        
        const area: AreaProperties = event.target.feature.properties;
        setselectedAreas(select => [...select, area]);
    };

    const onMouseOverArea = (event: LeafletMouseEvent) => {
        const areaName: string = event.target.feature.properties.megye;
        event.target.bindPopup(`${areaName}`).openPopup();

    };

    const onEachArea = (area: Feature<Geometry, AreaProperties>, layer: Layer): void => {
        layer.on({
            click: onClickArea,
            mouseover: onMouseOverArea,
        });
    };

    const removeArea = (area: AreaProperties): any => {
        const newArr = selectedAreas.filter(a => a.megye !== area.megye);
        setselectedAreas(newArr);
    };

    const position: LatLngExpression = [47.170, 18.990];

    const formatNumberWithCommas = (number: number) => {
        return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const onSubmit = async () => {
        const response = await axios({
            method: "POST",
            data: {
              areas: selectedAreas,
            },
            // withCredentials: true,
            url: "/api/offer",
        });
        const data = await response.data;
        console.log(data);
    }

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
                <table>
                    <thead>
                        <tr>
                            <th>Terület</th>
                            <th>Népesség</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        selectedAreas.map((area: AreaProperties, i) => 
                            (
                                <tr key={i}>
                                    <td>{area.megye}</td>
                                    <td>{formatNumberWithCommas(area.population)} fő</td>
                                    <td><button onClick={() => removeArea(area)}>Törlés</button></td>
                                </tr>
                            )
                        )
                        }
                    </tbody>
                </table>
                {/* TODO: name, email address, free text */}
                <button onClick={onSubmit} type="submit">Ajánlat kérése</button>
            </div>
            <div>v{version}</div>
        </>
    );
};

export default App;
