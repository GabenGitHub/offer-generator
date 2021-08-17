import { Feature, Geometry } from "geojson";
import { Layer, LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import hungary from "../data/counties.json";
import { AreaProperties } from "../models/area-properties";

const Map: React.FC<any> = ({updateState}) => {
    const [counties, setCounties]: any = useState<GeoJSON.FeatureCollection<any>>();
    
    useEffect(() => {
        setCounties(hungary);
    }, []);

    const onClickArea = (event: LeafletMouseEvent): void => {
        event.target.setStyle({
            color: "red",
            fillColor: "red"
        });

        updateState(event);
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
    
    return (
        <>
            <MapContainer className="map-container" center={[47.170, 18.990]} zoom={8} scrollWheelZoom={true}>
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
        </>
    )
}

export default Map
