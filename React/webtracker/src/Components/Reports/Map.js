import React, { useEffect, useState } from "react"
import { Popover, Whisper } from "rsuite";
import { scaleLinear } from "d3-scale";
import { 
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule,
    ZoomableGroup
 } from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
 .domain([0.29, 0.68])
 .range(["#ffedea", "#ff5233"]);

const MapChart = () => {
    const [data, setData] = useState([]);
    const [countryData, setCountry] = useState({ location: '', total: 0 });

    const speaker = (
        <Popover title={countryData.location}>
            <p>
                In this country there are {countryData.total} vaccinated people.
            </p>
        </Popover>
    );

    const selectCountry = (country) => {
        setCountry(country);
    }

    useEffect(async () => {
        const options = {
            method: 'GET', headers: {
                'Content-Type' : 'application/json'
            }
        }
        let response = await fetch('https://us-central1-core-silicon-306401.cloudfunctions.net/Locations', options)
            .then(response => response.json())
            .then(data => {
                return data;
            });
        setData(response);
    }, []);

    return (
        <div className="modal-container">
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}
            >
                <ZoomableGroup zoom={1}>
                <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
                <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
                {
                    data.length > 0 && (
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const d = data.find((s) => {
                                        return s.location === geo.properties.NAME
                                    });
                                    return (
                                        <Whisper placement="top" trigger="click" speaker={speaker}>
                                            <Geography 
                                                key={geo.rsmKey}
                                                geography={geo}
                                                fill={d ? colorScale(d["total"]) : "#F5F4F6"}
                                                onClick={() => selectCountry(d ? d : { location: geo.properties.NAME, total: 0 })}
                                            />
                                        </Whisper>
                                    );
                                })
                            }
                        </Geographies>
                    )
                }
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default MapChart;