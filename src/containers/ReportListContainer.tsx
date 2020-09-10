// Container component
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// import { Navbar } from 'react-bootstrap';
import { getListReportsFavorites, getAllReportsByUser, getListReportsViews, getListReportsInstitutional } from './../services/report';
import ReportList from '../components/ReportList';
import { removeLogin, isAuthUser } from './../services/authService';
import { getListTypes } from './../services/tipo';
import { userInterface, userStructure } from './../interfaces/user' ;
import { isAdmin } from './../services/usuario';
import './styles.css';

class ReportListContainer extends Component {
    state = {
        reportList: [],
        listReportsFavorites: [],
        tipoView: '',
        user : userStructure ,
        areasUser: []
    };

    componentDidMount = async () => {
        const user = await isAuthUser();
        
        if (user) {
            this.setState({
                reportList: await getAllReportsByUser(user.id),//getReports(),
                user: user
            }, async () => {
                console.log("loadAreasByUser: ", await this.loadAreasByUser());
            });
        }
    }

    allMyReports = async () => {
        if (this.state.user) this.setState({ reportList: await getAllReportsByUser(this.state.user.id), tipoView: 'Todos' }); 
    }

    myFavoritesReports = async () => {
        if (this.state.user) this.setState({ reportList: await getListReportsFavorites(this.state.user.id), tipoView: 'Favoritos' }); 
    }

    myViewsReports = async () => {
        if (this.state.user) this.setState({ reportList: await getListReportsViews(this.state.user.id), tipoView: 'Vistos' }); 
    }

    loadAreasByUser = async () => {
        if(this.state.user.usuario_tipo_perfils) this.setState({ areasUser: await getListTypes(this.state.user.usuario_tipo_perfils)});
    }

    myInstitutionalReports = async () => {
        if (this.state.user) this.setState({ reportList: await getListReportsInstitutional(this.state.user.id, 1),tipoView: 'Institucional' }); 
    }

    logOut = () => {
        removeLogin();
    }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-dark bg-primary"> {/*style="background-color: #e3f2fd;"> */}
                    <a className="navbar-brand" href="/#">Reportes PowerBI</a>
                </nav>
                <Button variant="warning" onClick={() => this.logOut()}>LogOut</Button>
                <div className="sidenav">
                    <a href="#todosMisReportes" onClick={() => this.allMyReports()}>Mis Reportes</a>
                    <a href="#misFavoritos" onClick={() => this.myFavoritesReports()}>Mis Favoritos</a>
                    <a href="#recientes" onClick={()=> this.myViewsReports()}>Recientes</a>
                    <a href="#Institutional" onClick={()=> this.myInstitutionalReports()}>Institucional</a>
                </div>
                <div className="main">
                    { this.state.reportList.length > 0 ? 
                    <ReportList
                        reports={this.state.reportList}></ReportList> : `No se encuentran reportes del tipo ${this.state.tipoView}`}
                </div>
            </div>
        );
    }
}

export default ReportListContainer;

// const mapStateToProps = (state:any) => ({user: state.user});
// export default connect(mapStateToProps, null)(ReportListContainer);