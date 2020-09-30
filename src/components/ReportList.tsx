import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setReportsAction } from "./../store/actions";
import { isAuthUser } from "../services/authService";
import { addFavorite, deletedReport } from './../services/report';
// import { Container, Navbar } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import CreateReport from "./Report/Create";
import { reportInterface, reportStructure } from './../interfaces/report';
import { messageInterface, messageStructure } from './../interfaces/messages';

type MyProps = { setReportDispatch: any, reports: any, message: messageInterface };
type MyState = {
  reportList: any;
  reports: any;
  show: boolean;
  reportEdit: reportInterface;
  message: messageInterface
}
class ReportList extends Component<MyProps, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      reportList: [],
      reports: [],
      show: false,
      reportEdit: reportStructure,
      message: (this.props.message) ? this.props.message : messageStructure
    };
  }

  componentDidMount = async () => {
    if (this.props.reports) {
      this.setState({ reportList: this.props.reports });
    }

    console.log("MESSAGE1:", this.props.message);
  }

  addToFavorite = async (report_id: number, index: number) => {
    const user = await isAuthUser();
    if (user && user.id) {
      const usuarioReporte = { usuario_id: user.id, reporte_id: report_id, favorito: 1 };
      const isAdded = await addFavorite(usuarioReporte);
      if (isAdded) {
        this.props.reports[index].favorito = (this.props.reports[index].favorito === false || parseInt(this.props.reports[index].favorito) === 0) ? true : false;
        this.setState({ reportList: this.props.reports }); //actualiza estado y estrella

        this.props.setReportDispatch(this.props.reports);
      }
    }
  }

  editReport = async (report: any) => {
    console.log(report);
    this.setState({ show: true, reportEdit: report });
  }

  deleteReport = async (report: any, index: number) => {
    console.log(report);
    const isDeleted = await deletedReport(report);
    if(isDeleted) {
      this.props.reports.splice(index, 1);
      this.setState({ reportList: this.props.reports });
    }
  }

  onReturnFormSubmit = async (dataReturn: any) => {
    if (dataReturn.success){
      this.setState({ message: dataReturn, show: false }, () => {
        window.setTimeout(()=>{
          this.setState({message: messageStructure})
        }, 4000)
      });
      console.log(this.state.message)}
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
                  <FontAwesomeIcon icon={['fas', 'edit']} onClick={() => { this.editReport(report) }} />
                  <FontAwesomeIcon icon={['fas', 'minus-circle']} onClick={() => { if(window.confirm('Esta seguro de eliminar el Reporte?')){this.deleteReport(report, index)};}} />
                </div>
              ))}
            </div>
          </div>
          <div className="two">DOS</div>
        </div>
        <div className="container-fluid">
        </div>
        <Modal show={this.state.show} >
          <Modal.Header> Reporte</Modal.Header>
          <Modal.Body>
            <CreateReport reporte={this.state.reportEdit} onSubmit={this.onReturnFormSubmit} />
          </Modal.Body>
          <Modal.Footer><Button onClick={() => this.setState({ show: false })}>Cerrar</Button></Modal.Footer>
        </Modal>
      </div>
    );
  }
};

//LEER LOS MENSAJES que vienen de REDUX

const mapStateToProps = (state: any) => ({ message: state.message });
const mapDispatchToPropsActions = (dispatch: any) => ({
  setReportDispatch: (value: any) => dispatch(setReportsAction(value)), //login.data
});
export default connect(mapStateToProps, mapDispatchToPropsActions)(ReportList);
