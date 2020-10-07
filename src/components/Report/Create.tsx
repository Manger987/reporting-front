import React from "react";
import { reportInterface, reportStructure } from './../../interfaces/report';
// import { messageInterface } from './../../interfaces/messages';
import { createReport } from './../../services/report';
import { setMessageAction } from './../../store/actions';
// import "./styles.css";
import { connect } from "react-redux";
import FileUpload from './../FileUpload';
import ReportUnit from './ReportUnit';
import { Form } from "react-bootstrap";

type MyProps = { reporte?: reportInterface, setMessageDispatch: any, onSubmit?: any, reports: any };
type MyState = { reporte: any, uploadedFiles: any, [key: string]: any };
class CreateReport extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reporte: (this.props.reporte) ? this.props.reporte : reportStructure,
            uploadedFiles: {}
        };
    }

    submitForm = async (e: any) => {
        e.preventDefault();
        // console.log("PRUEBA:::", this.state.uploadedFiles);
        console.log("AOOOO:::" , this.state.reporte);
        const reportSaved = await createReport(this.state.reporte);
        if (reportSaved) {
            const dataReturn = { status: 200, success: true, message: "Reporte editado con exito." };
            this.props.setMessageDispatch(dataReturn);

            if (this.state.reporte.id !== null && this.props.reports.reports) { //si viene de ReportList.tsx de editar un reporte.
                await this.props.reports.reports.map((report: reportInterface, index: number) => {
                    if (report.id === this.state.reporte.id) {
                        this.props.reports.reports[index] = this.state.reporte;
                    }
                })
                this.setState({ reporte: reportStructure }); //setea formulario
                this.props.onSubmit(dataReturn); //envia informacion a padre con mensaje (si viene de ReportList.tsx)
            } else {
                this.setState({ reporte: reportStructure }); //setea formulario
                alert("dato Guardado con exito!!!");
            }
        }
    }

    updateInputValue = (event: any) => {
        const dataReport = { ...this.state.reporte, [event.target.id]: event.target.value };
        this.setState({
            reporte: dataReport
        });
    };

    uploadedFiles = (data: any) => {
        this.setState({ reporte: { ...this.state.reporte, reporte_archivo: data } });
    };

    onGetTypeReport = (reportype: any) => {
        this.setState({reporte: { ...this.state.reporte, reporte_tipo: reportype}});
    }

    render() {
        return (
                <div className="container">
                    <div className="col-md-8">
                    <form>
                        <div className="form-group">
                            <label className="col-sm-3 col-form-label">Nombre</label>
                            <div className="col-sm-9" ><input className="form-control" type="text" id="nombre" name="nombre" value={this.state.reporte.nombre} onChange={this.updateInputValue} /></div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 col-form-label">Descripcion</label>
                            <div className="col-sm-9" ><textarea className="form-control" rows={3} id="descripcion" name="descripcion" value={this.state.reporte.descripcion} onChange={this.updateInputValue} ></textarea></div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 col-form-label">url</label>
                            <div className="col-sm-9" ><input className="form-control" type="text" id="url" name="url" value={this.state.reporte.url} onChange={this.updateInputValue} /></div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 col-form-label">Vista del reporte</label>
                            <div className="col-sm-9" ><input className="form-control" type="text" id="vista_reporte" name="vista_reporte" value={this.state.reporte.vista_reporte} onChange={this.updateInputValue} /></div>
                        </div>
                        <div className="form-group">
                            <FileUpload uploadedFiles={this.uploadedFiles} />
                        </div>
                        <div>
                            <ReportUnit reporte={this.state.reporte} reporteTipo={this.onGetTypeReport} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success form-control" onClick={this.submitForm}>Enviar</button>
                        </div>
                    </form>
                    </div>
                </div>
        );
    }
}

// export default CreateReport;

const mapStateToProps = (state: any) => ({ reports: state.reports });
const mapDispatchToPropsActions = (dispatch: any) => ({
    setMessageDispatch: (value: any) => dispatch(setMessageAction(value)), //login.data
});

export default connect(mapStateToProps, mapDispatchToPropsActions)(CreateReport);