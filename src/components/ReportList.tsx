import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'react-grid-system';
import { setReportsAction } from "./../store/actions";
import { isAuthUser } from "../services/authService";
import { addFavorite, deletedReport } from './../services/report';
// import { Container, Navbar } from "react-bootstrap";
import "./styles.css";
import { connect } from "react-redux";
import CreateReport from "./Report/Create";
import { reportInterface, reportStructure } from './../interfaces/report';
import { messageInterface, messageStructure } from './../interfaces/messages';
import { Card } from "react-bootstrap";

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
    if (isDeleted) {
      this.props.reports.splice(index, 1);
      this.setState({ reportList: this.props.reports });
    }
  }

  onReturnFormSubmit = async (dataReturn: any) => {
    if (dataReturn.success) {
      this.setState({ message: dataReturn, show: false }, () => {
        window.setTimeout(() => {
          this.setState({ message: messageStructure })
        }, 4000)
      });
      console.log(this.state.message)
    }
  }

  render() {
    console.log("REPORTTTTTT:::***********", this.props.reports);

    // const Styles = {
    //   card: {
    //     width: '18rem',

    //     img: {
    //       width: '100%',
    //       height: '100%'
    //     }
    //   }
    // };

    return (
      <div>
        <Container>
          <Row>
          {this.props.reports.map((report: any, index: number) => (
            <Col md={4} key={report.id}>
              <Card style={{width: '18rem', marginTop:'10px'}} className="box">
                {(report.reporte_archivo.length > 0) ? 
                <Card.Img variant="top" src={require("./../public/img/pdf.png")} style={{width:'80%', height:'80%'}}/> : 
                <Card.Img variant="top" src={require("./../public/img/power_bi.png")} />}
                <Card.Body>
                  <h4><Card.Text>{report.nombre}</Card.Text></h4>
                  <ul className="list-group list-group-flush">
                    { (isAuthUser().id) ? 
                    <li className="list-group-item">
                      {(report.favorito) ?
                        <FontAwesomeIcon icon={['fas', 'star']} onClick={() => { this.addToFavorite(report.id, index) }} /> :
                        <FontAwesomeIcon icon={['far', 'star']} onClick={() => { this.addToFavorite(report.id, index) }} />}
                      <FontAwesomeIcon icon={['fas', 'edit']} onClick={() => { this.editReport(report) }} />
                      <FontAwesomeIcon icon={['fas', 'minus-circle']} onClick={() => { if (window.confirm('Esta seguro de eliminar el Reporte?')) { this.deleteReport(report, index) }; }} />
                    </li> : report.descripcion}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
          </Row>
        </Container>
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

//LEER LOS MENSAJES que vienen de REDUX.
const mapStateToProps = (state: any) => ({ message: state.message });
const mapDispatchToPropsActions = (dispatch: any) => ({
  setReportDispatch: (value: any) => dispatch(setReportsAction(value)), //login.data
});
export default connect(mapStateToProps, mapDispatchToPropsActions)(ReportList);
