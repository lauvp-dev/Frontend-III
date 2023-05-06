import React from "react";

export default class ListaHistorial extends React.Component {
    render() {  
        return (
            <ul>{this.props.historial.slice(0,-1).map((letraOpcion, i) => <li key={i}>{letraOpcion}</li>)}</ul>
        );
    }
}