import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';
import { FaMap, FaAngleDoubleDown } from 'react-icons/fa';
import { Col, Row, Accordion, Card, Button,useAccordionToggle } from 'react-bootstrap'
import { dados } from './resultado.js'
const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiZGJhcnJpbmhhIiwiYSI6ImNrMWh2Z3dhOTA2d3YzaHFpc2t4NDNoMHAifQ.1a_G1A1572E2VgnF2k3Ifw'
});
const geojson = require('./geojson.json');

const symbolLayout = {
    "icon-image": "marker-15",
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.6],
    'text-anchor': 'top'
};

const symbolPaint = {
    'text-color': 'black'
};


const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <div
            style={{textAlign: 'center'}}
            onClick={decoratedOnClick}
        >
            {children}
        </div>
    );
}

export default class MapBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: null,
            tema: "mapbox://styles/mapbox/streets-v8"
        }
    }

    componentDidMount() {
        //this.transformaDados()
    }

    transformaDados = () => {
        let result = dados
        let features = {
            "type": "FeatureCollection",
            "features": []
        }
        let gson = []

        result.map(item => {
            let aux = {
                "type": "Feature",
                "properties": {
                    "NomeProprietario": item.NomeProprietario,
                    "DocumentoProprietario": item.DocumentoProprietario,
                    "Municipio": item.Municipio,
                    "NumInmetro": item.NumInmetro,
                    "NumSerie": item.NumSerie,
                    "Local": item.Local,
                    "DataVerificacao": item.DataVerificacao,
                    "DataValidade": item.DataValidade,
                    "Resultado": item.Resultado
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        item.lng,
                        item.lat
                    ]
                }
            }
            gson.push(aux)
        })
        features["features"] = gson
        console.log(JSON.stringify(features))
    }


   
    render() {


        return (
            <div>
                <Map
                    style={this.state.tema}
                    hash={true}
                    center={[-42.778347, -5.069975]}
                    zoom={[12]}
                    containerStyle={{
                        height: '100vh',
                        width: '100vw'
                    }}>
                    <GeoJSONLayer
                        data={geojson}
                        symbolOnClick={(teste) => console.log(teste)}
                        symbolLayout={symbolLayout}
                        symbolPaint={symbolPaint}
                    />
                </Map>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 10,
                    backgroundColor: "#fff",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    width: '25%'
                }}>
                    <Col>
                        <div  onClick={()=>  useAccordionToggle('0')}>
                            <h3 style={{ textAlign: 'center' }}> <FaMap /> MapCameras </h3>
                        </div>
                    </Col>
                    <Accordion defaultActiveKey="0" style={{ backgroundColor: '#fff', borderRadius: 10, marginTop: 10 }}>
                        <CustomToggle eventKey="0"><FaAngleDoubleDown /></CustomToggle>

                        <Accordion.Collapse eventKey="0" style={{ borderRadius: 10 }}>
                            <div id="search" style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10 , alignItems: 'center'}}>
                                <h5 style={{textAlign: 'center'}}>Informações da Camera</h5>
                            </div>
                        </Accordion.Collapse>
                    </Accordion>

                </div>
            </div>
        );
    }
}
