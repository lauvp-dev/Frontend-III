import React from "react";
import ListaHistorial from'./ListaHistorial.js';

export default class Recordatorio extends React.Component {
    render() {
        const ultimaOpcionElegida = this.props.historial[this.props.historial.length - 1];
        return (
            <div className="recordatorio">
                <h3>Selección anterior: {ultimaOpcionElegida}</h3>
                <h4>Historial de opciones elegidas: </h4>
                {/*Comenzaré a mostrar la lista del historial cuando el usuario haya hecho al menos dos elecciones (tal como se ve en el deploy de la aplicación que nos dieron de ejemplo)*/}
                {this.props.habilitarHistorial && <ListaHistorial historial={this.props.historial}/>}
            </div>
        );
    }
}
