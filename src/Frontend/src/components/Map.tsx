import { Feature, Geometry } from "geojson";
import { Layer, LeafletMouseEvent } from "leaflet";
import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { SelectedAreaContext } from "../context/SelectedAreaContext";

import hungary from "../data/counties.json";
import { AreaProperties } from "../models/area-properties";

const Map: React.FC<any> = () => {
    const [ counties, setCounties ]: any = useState<GeoJSON.FeatureCollection<any>>();
    const { selectedAreas, setSelectedAreas } = useContext<any>(SelectedAreaContext)
    
    const geoJsonRef = useRef<any>();
    
    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.clearLayers().addData(counties);
        }
        setCounties(hungary);
    }, [counties, setCounties]);

    const onClickArea = (event: LeafletMouseEvent): void => {
        
        const selected = event.target.feature.properties.selected;
        
        if (selected) {
            event.target.setStyle({
                fillColor: "black",
                color: "black",
                weight: 2,
                opacity: 6,
            });

            // @ts-ignore
            const filteredAreas = selectedAreas.filter(el => el.name !== event.target.feature.properties.name);
            setSelectedAreas(filteredAreas);

            event.target.feature.properties.selected = false;
        } else {
            event.target.setStyle({
                color: "red",
                fillColor: "red"
            });
            
            // @ts-ignore
            setSelectedAreas(select => [...select, event.target.feature.properties]);
            event.target.feature.properties.selected = true;
        }
    };

    const onMouseOverArea = (event: LeafletMouseEvent) => {
        const areaName: string = event.target.feature.properties.name;
        event.target.bindPopup(`${areaName}`).openPopup();
    };

    // workaround to access the state
    function useStableCallback<Args extends unknown[], Return>(callback: (...args: Args) => Return) {
        const callbackRef = useRef(callback);
        callbackRef.current = callback;
    
        const stableCallback = useCallback((...args: Args) => {
        return callbackRef.current(...args);
        }, []);
    
        return stableCallback;
    }

    const stableOnClickArea = useStableCallback(onClickArea);

    const onEachArea = (area: Feature<Geometry, AreaProperties>, layer: Layer): void => {
        
        layer.on({
            click: stableOnClickArea,
            mouseover: onMouseOverArea,
        });
    };

    const defaultStyle = {
        fillColor: "black",
        color: "black",
        weight: 2,
        opacity: 6,
    }
    
    return (
        <>
            <MapContainer className="map-container" center={[47.170, 18.990]} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <GeoJSON
                    ref={geoJsonRef}
                    data={counties} 
                    onEachFeature={onEachArea}
                    style={defaultStyle}
                />
            </MapContainer>
        </>
    )
}

export default Map
