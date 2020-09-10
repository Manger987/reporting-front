import React, { Component } from 'react';

class SidebarComponent extends Component {
    render() {
        return (
            <div className="sidenav">
                <a href="#todosMisReportes">Mis Reportes</a>
                <a href="#misFavoritos">Mis Favoritos</a>
                <a href="#recientes">Recientes</a>
                <a href="#contact">Contact</a>
            </div>
        );
    }
}

export default SidebarComponent;