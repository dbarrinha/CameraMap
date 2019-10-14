import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { OverlayTrigger, Popover, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import { dados } from './resultado.js'

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAM_8jES-UVDdwxKXXc_wjTbSHkiRkVtsk&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={props.center}
    >
        {dados.map((item, index) => {
            return (
                <Marker
                    setIcon={<div style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: "#e67"}} />}
                    defaultTitle={item.NomeProprietario}
                    position={{ lat: item.lat, lng: item.lng }}
                    onClick={() => props.onMarkerClick(item)} />
            )
        })

        }
    </GoogleMap>
)


export default class MyFancyComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isMarkerShown: false,
            markers: [],
            itemSelected: null
        }
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = (item) => {
        this.setState({
            itemSelected: item
        })
    }

    render() {
        console.log( this.state.itemSelected && typeof this.state.itemSelected.lat)
        return (
            <>
            
                <MyMapComponent
                    onMarkerClick={(item) => this.handleMarkerClick(item)}
                    markers={this.state.markers}
                    center={this.state.itemSelected ? ({ lat: this.state.itemSelected.lat, lng: this.state.itemSelected.lng }) : ({ lat: -5.069975, lng: -42.778347 })}
                />

                {this.state.itemSelected && (
                    <Table style={{
                        position: 'fixed',
                        borderRadius: 5,
                        right: 1, top: 1,
                        width: '30%',
                        height: '100vh'
                    }} striped bordered hover variant="dark">
                        <h3>Informações</h3>
                                <tr>Nome Proprietario :{this.state.itemSelected.NomeProprietario}</tr>
                                <tr>Documento Proprietario :{this.state.itemSelected.DocumentoProprietario}</tr>
                                <tr>Municipio :{this.state.itemSelected.Municipio}</tr>
                                <tr>Num Inmetro :{this.state.itemSelected.NumInmetro}</tr>
                                <tr>Num Serie :{this.state.itemSelected.NumSerie}</tr>
                                <tr>Local :{this.state.itemSelected.Local}</tr>
                                <tr>Data Verificacao :{this.state.itemSelected.DataVerificacao}</tr>
                                <tr>Data Validade :{this.state.itemSelected.DataValidade}</tr>
                                <tr>Resultado :{this.state.itemSelected.Resultado}</tr>
                    </Table>
                )}
            </>
        )
    }
}