import React, { Component } from 'react';
import { Form, ToggleButton } from 'react-bootstrap';
import { getAllTypes, getTypesAreas } from './../../services/tipo';
type MyProps = { area?: any, reporte:any, reporteTipo: any };
type Mystates = { areas: any, area: any, tipoArea: any, unit: any, selectValues: any };
class ReportUnit extends Component<MyProps, Mystates> {
    constructor(props: any) {
        super(props);
        this.state = {
            areas: [],
            area: {},
            tipoArea: [],
            unit: [],
            selectValues:[]
        }
    }

    async componentDidMount() {
        console.log("REPORTE:SELECT:", this.props.reporte);
        this.setState({
            areas: await getAllTypes(),
            tipoArea: await getTypesAreas()
        });
    }

    setRadioValue = (tipo: any) => {
        console.log(tipo);
    }

    showTypes = async (event: any) => {
        this.setState({unit: await this.state.areas.filter((area: any) => area.tipo_id === parseInt(event.target.value))});
    }

    handleChange = (e: any) => {
        // this.props.reporteTipo( ...this.props.reporteTipo, { tipo_id: e.target.value})
        // console.log("EE:", this.props.reporteTipo);

        // console.log('ALOHA:', e.target.value);

        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            value.push({tipo_id: options[i].value});
          }
        }
        console.log("value:::", value);
        this.props.reporteTipo(value);
      }

    render() {
        return (
            <div>
                <div className="form-group">
                    <div>
                        <Form.Control
                            as="select"
                            className="my-1 mr-sm-2"
                            id="inlineFormCustomSelectPref"
                            custom
                            onChange={this.showTypes}
                        >
                            <option value="0">Seleccione...</option>
                            {this.state.tipoArea.map((area: any, index: number) => 
                                <option key={index} value={area.tipo_id}>{area.descripcion_tipo}</option>
                            )}
                        </Form.Control>
                    </div>
                    <div>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Area:</Form.Label>
                            <Form.Control as="select" multiple  onChange={this.handleChange}>
                            {this.state.unit.map((area: any, index: number) => (
                                <option key={index} value={area.id}  >{area.nombre}</option>
                            ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                </div>
            </div>
        )
    };
}

export default ReportUnit; 
