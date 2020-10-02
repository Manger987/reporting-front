// Container component
import React, { Component } from 'react';
import Button from 'react-bootstrap/esm/Button';
// import { Navbar } from 'react-bootstrap';
import { getListReportsFavorites, getAllReportsByUser, getListReportsViews, getListReportsArea } from './../services/report';
import ReportList from '../components/ReportList';
import { removeLogin, isAuthUser } from './../services/authService';
import { getListTypes } from './../services/tipo';
import { setReportsAction } from "./../store/actions";
import { userStructure } from './../interfaces/user';
import { tipoStructure } from './../interfaces/tipo';
// import { isAdmin } from './../services/usuario';
import './styles.css';
import { connect } from 'react-redux';
import NavbarMenu from './../components/Frame/Navbar/NavbarMenu';
import Sidebar from './../components/Frame/Sidebar/Sidebar';
import { Col, Container, Row } from 'react-bootstrap';

type MyProps = { setReportDispatch: any, ReportListProps: any };
type MyState = {
    reportList: any;
    listReportsFavorites: any;
    tipoView: string;
    user: any;
    areasUser: any;
    [key: string]: any
};
class ReportListContainer extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reportList: (this.props.ReportListProps) ? this.props.ReportListProps : [],
            listReportsFavorites: [],
            tipoView: '',
            user: userStructure,
            areasUser: [tipoStructure]
        };
    }

    componentDidMount = async () => {
        // const user = await isAuthUser();

        // if (user) {
        //     const reportList = await getAllReportsByUser(user.id);//getReports(),
        //     this.setState({
        //         reportList: reportList,
        //         user: user
        //     }, async () => {
        //         await this.loadAreasByUser();
        //         this.props.setReportDispatch(this.state.reportList);
        //     });
        // }
    }

    // allMyReports = async () => {
    //     if (this.state.user) this.setState({ reportList: await getAllReportsByUser(this.state.user.id), tipoView: 'Todos' }, () => this.props.setReportDispatch(this.state.reportList));
    // }

    // myFavoritesReports = async () => {
    //     if (this.state.user) this.setState({ reportList: await getListReportsFavorites(this.state.user.id), tipoView: 'Favoritos' }, () => this.props.setReportDispatch(this.state.reportList));
    // }

    // myViewsReports = async () => {
    //     if (this.state.user) this.setState({ reportList: await getListReportsViews(this.state.user.id), tipoView: 'Vistos' }, () => this.props.setReportDispatch(this.state.reportList));
    // }

    // loadAreasByUser = async () => {
    //     if (this.state.user.usuario_tipo_perfils) this.setState({ areasUser: await getListTypes(this.state.user.usuario_tipo_perfils) });
    // }

    // listReportsByArea = async (area_id: number, nameType: string) => {
    //     if (this.state.user) this.setState({ reportList: await getListReportsArea(area_id), tipoView: nameType }, () => this.props.setReportDispatch(this.state.reportList));
    // }

    // logOut = () => {
    //     removeLogin();
    // }

    render() {
        return (
            <div>
                <NavbarMenu />
                <Container fluid>
                    <Row>
                        <Col xs={2} id="sidebar-wrapper">
                            <Sidebar />
                        </Col>
                        <Col xs={10} id="page-content-wrapper">
                            <div className="main">
                                {this.props.ReportListProps.reports && this.props.ReportListProps.reports.length > 0 ?
                                    <ReportList reports={this.props.ReportListProps.reports}    ></ReportList> : `No se encuentran reportes del tipo ${this.state.tipoView}`}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({ ReportListProps: state.reports });
const mapDispatchToPropsActions = (dispatch: any) => ({
    setReportDispatch: (value: any) => dispatch(setReportsAction(value)), //login.data
});
export default connect(mapStateToProps, mapDispatchToPropsActions)(ReportListContainer);