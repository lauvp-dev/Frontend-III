import React from "react";
import Recordatorio from'./Recordatorio';
import Opciones from'./Opciones.js';
import data from "./data.json";

export default class Layout extends React.Component {
    //Armo el constructor con los atributos que voy a necesitar manipular
    constructor(props) {
        super(props);
        this.state = {
            contador: 0,
            historial: [],
            historiaActual: data[0],
            habilitarHistorial: false
        };
    };

    //Utilizo este método del ciclo de vida
    componentDidMount () {
        console.log("El componente se montó correctamente y en menos de 1 segundo aparecerá el alert de Bienvenida.");
        setTimeout(() => { alert("¡Bienvenid@! 🤗 Esta es una versión tipo MVP del viejo y conocido: 'Elige tu propia aventura' ¡Espero que te guste! 😎 ");
        }, 500);
    };

    //Defino todas las funciones necesarias (uso arrow functions para no tener que escribir el binding)
    handleClick = (letraOpcion) => {
        this.setState({ contador: this.state.contador + 1 });
        //Chequeo si el usuario finalizó el recorrido
        const recorridoFinalizado = this.state.contador === (this.props.recorridoMaximo-1);
        if (recorridoFinalizado) {
            //Si el usuario finalizó el recorrido, reinicio el juego
            this.reiniciar();
        } else {
            //Chequeo si el usuario ya tiene suficientes elecciones hechas como para comenzar a mostrar la lista del historial
            if (this.state.historial.length > 0 ) {
                this.setState({ habilitarHistorial: true });
            }
            this.setState({ 
                //Guardo cada elección del usuario en el historial
                historial: [...this.state.historial, letraOpcion] },
                //Actualizo la historia actual de acuerdo a lo que eligió el usuario
                () => {
                    const historiaSeleccionada = this.obtenerHistoria(letraOpcion);
                    this.setState({ historiaActual: historiaSeleccionada });
                }
            );
        }
    };

    reiniciar = () => {
        alert("🎉 ¡Felicidades, llegaste al final! 🎉");
        this.setState({
            contador: 0,
            historial: [],
            historiaActual: data[0],
            habilitarHistorial: false
        });
    };

    obtenerHistoria = (letraOpcion) => {
        //Armo el id de la opción (numero+letra)
        const nroOpcion = this.state.contador + 1;
        const opcionCompleta = nroOpcion + letraOpcion.toLowerCase();
        //Busco la historia correspondiente a esa opción elegida por el usuario
        return data.find((opcionBuscada) => opcionBuscada.id === opcionCompleta);
    };

    //Renderizo
    render() {
        return (
            <div className="layout">
                <h1 className="historia">{this.state.historiaActual.historia}</h1>
                <Opciones
                    handleClick={this.handleClick}
                    opcionA={this.state.historiaActual.opciones.a}
                    opcionB={this.state.historiaActual.opciones.b}
                />
                <Recordatorio habilitarHistorial={this.state.habilitarHistorial} historial={this.state.historial} />
            </div>
        );
    }
}