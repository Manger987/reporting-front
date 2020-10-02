import React, { Component, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { SidebarData } from './SidebarData';
import "./index.css";
import { IconContext } from "react-icons";
import { reportInterface, reportStructure } from "../../../interfaces/report";
import { messageInterface, messageStructure } from "../../../interfaces/messages";
import { userStructure } from "../../../interfaces/user";
import { getAllReportsByUser, getListReportsArea, getListReportsFavorites, getListReportsViews } from "../../../services/report";
import { getListTypes } from "../../../services/tipo";
import { tipoStructure } from "../../../interfaces/tipo";
import { connect } from "react-redux";
import { setReportsAction } from "../../../store/actions";
import { stat } from "fs";
import { isAuthUser, removeLogin } from "../../../services/authService";
import { Nav } from "react-bootstrap";

type MyProps = {
  //   reports: any;
  //   message: messageInterface;
  setReportDispatch: any;
  userProps: any;
};
type MyState = {
  reportList: any;
  reports: any;
  show: boolean;
  reportEdit: reportInterface;
  //   message: messageInterface;
  sidebar: any;
  user: any;
  areasUser: any;
  tipoView: string;
};
class Sidebar extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      reportList: [],
      reports: [],
      show: false,
      reportEdit: reportStructure,
      //   message: this.props.message ? this.props.message : messageStructure,
      sidebar: false,
      user: (this.props.userProps) ? this.props.userProps : userStructure,
      areasUser: [tipoStructure],
      tipoView: ''
    };
  }

  componentDidMount = async () => {
    const user = await isAuthUser();

    if (user) {
      const reportList = await getAllReportsByUser(user.id);//getReports(),
      this.setState({
        reportList: reportList,
        user: user
      }, async () => {
        await this.loadAreasByUser();
        this.props.setReportDispatch(this.state.reportList);
      });
    }
  }

  showSidebar = () => this.setState({ sidebar: !this.state.sidebar });

  allMyReports = async () => {
    console.log("USER**", this.state.user, this.props.userProps);
    if (this.state.user) this.setState({ reportList: await getAllReportsByUser(this.state.user.id), tipoView: 'Todos' }, () => { this.props.setReportDispatch(this.state.reportList) });
  }

  myFavoritesReports = async () => {
    if (this.state.user) this.setState({ reportList: await getListReportsFavorites(this.state.user.id), tipoView: 'Favoritos' }, () => this.props.setReportDispatch(this.state.reportList));
  }

  myViewsReports = async () => {
    if (this.state.user) this.setState({ reportList: await getListReportsViews(this.state.user.id), tipoView: 'Vistos' }, () => this.props.setReportDispatch(this.state.reportList));
  }

  loadAreasByUser = async () => {
    if (this.state.user.usuario_tipo_perfils) this.setState({ areasUser: await getListTypes(this.state.user.usuario_tipo_perfils) });
  }

  listReportsByArea = async (area_id: number, nameType: string) => {
    if (this.state.user) this.setState({ reportList: await getListReportsArea(area_id), tipoView: nameType }, () => this.props.setReportDispatch(this.state.reportList));
  }

  // logOut = () => {
  //   removeLogin();
  // }

  render() {
    return (
      <>
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link onClick={() => this.allMyReports()}>Mis Reportes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => this.myFavoritesReports()}>Mis Favoritos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => this.myViewsReports()}>Recientes</Nav.Link>
            </Nav.Item>
            {this.state.areasUser ?
                this.state.areasUser.map((area: any) => {
                  return <Nav.Item>
                  <Nav.Link onClick={() => this.listReportsByArea(area.id, area.nombre)}>{area.nombre}</Nav.Link>
              </Nav.Item>
                }) : ''
              }
            </Nav>
      </>
    );
  }
}

// export default Sidebar;

const mapStateToProps = (state: any) => ({ ReportListProps: state.reports, userProps: state.user });
const mapDispatchToPropsActions = (dispatch: any) => ({
  setReportDispatch: (value: any) => dispatch(setReportsAction(value)), //login.data
});
export default connect(mapStateToProps, mapDispatchToPropsActions)(Sidebar);
