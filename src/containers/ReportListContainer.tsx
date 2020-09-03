// Container component
import React, { Component } from 'react';
import { getReports, getListReportsFavorites }  from './../services/report';
import ReportList from '../components/ReportList';

class ReportListContainer extends Component {
    /*constructor(props: any) {
        super(props);
        // Set initial state
        this.state = { reportList: [] };
    }*/
    state = { 
        reportList: [],
        listReportsFavorites: [] 
    };

    componentDidMount = async () => {
        /*this.setState(async state => { 
            return await {
                reportList: await getReports()
            }
        });*/
        this.setState({
            reportList: await getReports(),
            listReportsFavorites: await getListReportsFavorites(7)
        });
    }

    render() {
        return (
            <ReportList 
                reports={this.state.reportList} 
                reportsFavorites={this.state.listReportsFavorites}></ReportList>
        );
    }
}

export default ReportListContainer;

// const mapStateToProps = (state:any) => ({user: state.user});
// export default connect(mapStateToProps, null)(ReportListContainer);