import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import Tooltip from './components/tooltip'
import '../assets/css/popup.css'
import { FaMap, FaAngleDoubleDown } from 'react-icons/fa';
import { Col, Row, Accordion, Form, Button, useAccordionToggle } from 'react-bootstrap'

mapboxgl.accessToken = 'pk.eyJ1IjoiZGJhcnJpbmhhIiwiYSI6ImNrMWh2Z3dhOTA2d3YzaHFpc2t4NDNoMHAifQ.1a_G1A1572E2VgnF2k3Ifw';
const geojson = require('../geojson.json');
var map = ""
class Application extends React.Component {
    tooltipContainer;
    constructor(props) {
        super(props);
        this.state = {
            tema: 'mapbox://styles/mapbox/streets-v9',

        }
    }


    componentDidMount() {

        // Container to put React generated content in.
        this.tooltipContainer = document.createElement('div');

        map = new mapboxgl.Map({
            container: this.mapContainer,
            style: this.state.tema,
            center: [-42.778347, -5.069975],
            zoom: 12.5
        });

        map.on('load', function () {
            map.loadImage(require('../assets/marker5.png'), function (error, image) {
                if (error) throw error;
                map.addImage('cat', image);
                map.addLayer({
                    "id": "places",
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": geojson
                    },
                    "layout": {
                        "icon-image": "cat",
                        "icon-allow-overlap": true,
                        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                        'text-offset': [0, 0.6],
                        'text-anchor': 'top'
                    }
                })
            })
        });

        map.on('click', 'places', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.NomeProprietario;
            var Local = e.features[0].properties.Local;


            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`
                    <strong>${description}</strong>
                    <p>${Local}</p>
                    `
                )
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'places', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
        });
    }

    configMap = (tema) => {

        map = new mapboxgl.Map({
            container: this.mapContainer,
            style: tema,
            center: [-42.778347, -5.069975],
            zoom: 12.5
        });

        map.on('load', function () {
            map.loadImage(require('../assets/marker5.png'), function (error, image) {
                if (error) throw error;
                map.addImage('cat', image);
                map.addLayer({
                    "id": "places",
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": geojson
                    },
                    "layout": {
                        "icon-image": "cat",
                        "icon-allow-overlap": true,
                        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                        'text-offset': [0, 0.6],
                        'text-anchor': 'top'
                    }
                })
            })
        });

        map.on('click', 'places', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.NomeProprietario;
            var Local = e.features[0].properties.Local;


            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`
                    <strong>${description}</strong>
                    <p>${Local}</p>
                    `
                )
                .addTo(map);
        });

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'places', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
        });
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }} />
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
                        <div onClick={() => useAccordionToggle('0')}>
                            <h3 style={{ textAlign: 'center' }}> <FaMap /> MapCameras </h3>
                        </div>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Tema:</Form.Label>
                            <Form.Control as="select" onChange={(e) => {
                                this.configMap("mapbox://styles/mapbox/" + e.target.value)
                                //map.setStyle("mapbox://styles/mapbox/" + e.target.value);
                            }}>
                                <option value="streets-v11">streets</option>
                                <option value="light-v10">light</option>
                                <option value="dark-v10">dark</option>
                                <option value="outdoors-v11">outdoors</option>
                                <option value="satellite-v9">satellite</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                </div>
            </div>
        );
    }
}

export default Application;