import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReportUnit from './../components/Report/ReportUnit';
import { listForeignReports } from './../services/report';
import ReportList from './../components/ReportList';

type MyProps = { };
type MyState = { ReportList: any };
class ForeignReportContainer extends Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            ReportList : []
        }
    }

    async componentDidMount() {
        this.setState({ReportList: await listForeignReports(1)}, () => {
            console.log(this.state.ReportList);
        }); 
    }

    render() {
        return (
        <div>
            {/* <ReportUnit reports = {this.state.ReportList}></ReportUnit> */}
            <Container fluid>
                    <Row>
                        <Col xs={10} id="page-content-wrapper">
                            <div className="main">
                                {this.state.ReportList && this.state.ReportList.length > 0 ?
                                    <ReportList reports={this.state.ReportList} ></ReportList> : `No se encuentran reportes.`}
                            </div>
                        </Col>
                    </Row>
                </Container>
        </div>
    )};
}

export default ForeignReportContainer; 
