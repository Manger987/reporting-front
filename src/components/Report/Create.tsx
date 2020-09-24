import React from "react";
import { reportInterface, reportStructure } from './../../interfaces/report';
// import { messageInterface } from './../../interfaces/messages';
import { createReport } from './../../services/report';
import { setMessageAction } from './../../store/actions';
import "./styles.css";
import { connect } from "react-redux";
import FileUpload from './../FileUpload';

type MyProps = {reporte: reportInterface, setMessageDispatch: any, onSubmit: any, reports: any};
type MyState = { reporte: any , [key: string]: any };
class CreateReport extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reporte: (this.props.reporte) ? this.props.reporte : reportStructure 
        };
    }

    submitForm = async (e: any) => {
        e.preventDefault();
        const reportSaved = await createReport(this.state.reporte);
        if (reportSaved) {
            const dataReturn = {status: 200, success: true, message: "Reporte editado con exito."};
            this.props.setMessageDispatch(dataReturn);
            
            if (this.props.reports.reports){ //si viene de ReportList.tsx de editar un reporte.
                await this.props.reports.reports.map((report: reportInterface, index: number) => {
                    if(report.id === this.props.reporte.id) {
                        this.props.reports.reports[index] = this.state.reporte;
                    }
                })
                this.setState({reporte: reportStructure}); //setea formulario
                this.props.onSubmit(dataReturn); //envia informacion a padre con mensaje (si viene de ReportList.tsx)
            } else {
                this.setState({reporte: reportStructure}); //setea formulario
                alert("dato Guardado con exito!!!");
            }
        }
    }

    updateInputValue = (event: any) => {
        const dataReport = {...this.state.reporte, [event.target.id]: event.target.value};
        this.setState({
            reporte: dataReport
        });
    };

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">

                    </div>
                    <div>
                        <form>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input className="form-control" type="text" id="nombre" name="nombre" value={this.state.reporte.nombre} onChange={this.updateInputValue} />
                            </div>
                            <div className="form-group">
                                <label>Descripcion</label>
                                <textarea className="form-control" id="descripcion" name="descripcion" value={this.state.reporte.descripcion} onChange={this.updateInputValue} ></textarea>
                            </div>
                            <div className="form-group">
                                <label>url</label>
                                <input className="form-control" type="text" id="url" name="url" value={this.state.reporte.url} onChange={this.updateInputValue} />
                            </div>
                            <div className="form-group">
                                <label>Vista del reporte (exterior/interior)</label>
                                <input className="form-control" type="text" id="vista_reporte" name="vista_reporte" value={this.state.reporte.vista_reporte} onChange={this.updateInputValue} />
                            </div>
                            {/* <div className="form-group">
                                <label>Archivo</label>
                                <input className="form-control" type="text" id="archivo" name="archivo" value={(this.state.reporte.archivo) ? this.state.reporte.archivo : 'S/A'} onChange={this.updateInputValue}/>
                            </div> */}
                            <div className="form-group">
                                <FileUpload />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success form-control" onClick={this.submitForm}>Enviar</button>
                            </div>
                        </form>
                    </div>
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