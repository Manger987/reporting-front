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
        this.setState((state,props) => ({
            reportList: await getReports
        }));
        console.log('REPORTLIST:',this.state.reportList);
    }

    render() {
        return (
            <ReportList reports={this.state.reportList} />
        );
    }
}

