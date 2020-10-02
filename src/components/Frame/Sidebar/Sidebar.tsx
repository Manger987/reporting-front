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

  logOut = () => {
    removeLogin();
  }

  render() {
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={this.showSidebar} />
            </Link>
            <Link to="#" className="menu-bars">
              <BiLogOut onClick={this.logOut} />
            </Link>
          </div>
          <nav className={this.state.sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={this.showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              <li className="nav-text">
                <a href="#todosMisReportes" onClick={() => this.allMyReports()}>
                  Mis Reportes
                </a>
              </li>
              <li className="nav-text">
                <a href="#misFavoritos" onClick={() => this.myFavoritesReports()}>
                  Mis Favoritos
                </a>
              </li>
              <li className="nav-text">
                <a href="#recientes" onClick={() => this.myViewsReports()}>
                  Recientes
                </a>
              </li>
              {this.state.areasUser ?
                this.state.areasUser.map((area: any) => {
                  return <li className="nav-text">
                    <a href={`#${area.nombre}`} key={area.id} onClick={() => this.listReportsByArea(area.id, area.nombre)}>{area.nombre}</a>
                  </li>
                }) : ''
              }
              {/* {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
            </ul>
          </nav>
        </IconContext.Provider>
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
