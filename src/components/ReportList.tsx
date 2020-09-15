import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setReportsAction } from "./../store/actions";
import { isAuthUser } from "../services/authService";
import { addFavorite } from './../services/report';
// import { Container, Navbar } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";

type MyProps = { setReportDispatch: any, reports: any };
type MyState = {
  reportList: any;
  reports: any;
}
class ReportList extends Component<MyProps, MyState> {

  componentDidMount = async () => {
    if (this.props.reports) {
      this.setState({ reportList: this.props.reports });
    }
  }

  addToFavorite = async (report_id: number, index: number) => {
    const user = await isAuthUser();
    if (user && user.id) {
      const usuarioReporte = { usuario_id: user.id, reporte_id: report_id, favorito: 1 };
      const isAdded = await addFavorite(usuarioReporte);
      if (isAdded) {
        console.log("before:", this.props.reports[index].favorito);
        this.props.reports[index].favorito = (this.props.reports[index].favorito === false || parseInt(this.props.reports[index].favorito) === 0) ? true : false;
        this.setState({ reportList: this.props.reports },() => console.log("after:", this.props.reports[index].favorito)); //actualiza estado y estrella
        
        this.props.setReportDispatch(this.props.reports);
      }
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="three">
            <div>
              {this.props.reports.map((report: any, index: number) => (
                <div key={report.id}>
                  {report.nombre}
                  {(report.favorito) ?
                    <FontAwesomeIcon icon={['fas', 'star']} onClick={() => { this.addToFavorite(report.id, index) }} /> :
                    <FontAwesomeIcon icon={['far', 'star']} onClick={() => { this.addToFavorite(report.id, index) }} />}
                </div>
              ))}
            </div>
          </div>
          <div className="two">DOS</div>
        </div>

        <div className="container-fluid"></div>
      </div>
    );
  }
};

//hacer que haga el dispatch UNA VEZ CAMBIADO FAVORITO
// ReportList.propTypes = {
//   reports: PropTypes.array.isRequired,
// };

// export default ReportList;
// const mapStateToProps = (state:any) => ({user: state.user});
const mapDispatchToPropsActions = (dispatch: any) => ({
  setReportDispatch: (value: any) => dispatch(setReportsAction(value)), //login.data
});
export default connect(null, mapDispatchToPropsActions)(ReportList);
