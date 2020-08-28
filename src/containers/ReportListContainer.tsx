// Container component
import React, { Component } from 'react';
import { getReports }  from './../services/report';
import ReportList from '../components/ReportList';

class ReportListContainer extends Component {
    /*constructor(props: any) {
        super(props);
        // Set initial state
        this.state = { reportList: [] };
    }*/
    state = { reportList: [] };

    componentDidMount = async () => {
        /*this.setState(async state => { 
            return await {
                reportList: await getReports()
            }
        });*/
        this.setState({
            reportList: await getReports()
        });
    }

    render() {
        return (
            <ReportList reports={this.state.reportList}></ReportList>
        );
    }
}

export default ReportListContainer;

