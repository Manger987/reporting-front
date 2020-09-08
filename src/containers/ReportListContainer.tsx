// Container component
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// import { Navbar } from 'react-bootstrap';
import { getReports, getListReportsFavorites } from './../services/report';
import ReportList from '../components/ReportList';
import { removeLogin } from './../services/authService';

class ReportListContainer extends Component {
    state = {
        reportList: [],
        listReportsFavorites: []
    };

    componentDidMount = async () => {
        const user = await this.getCurrentUser();
        if (user) {
            console.log("USER:", user);
            this.setState({
                reportList: await getReports(),
                listReportsFavorites: await getListReportsFavorites(7)
            });
        }
    }

    getCurrentUser() {
        return localStorage.getItem('user');
    }

    logOut = () => {
        removeLogin();
    }

    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-dark bg-primary"> {/*style="background-color: #e3f2fd;"> */}
                    <a className="navbar-brand" href="#">Reportes PowerBI</a>
                </nav>
                <Button variant="warning" onClick={() => this.logOut()}>LogOut</Button>
                <ReportList
                    reports={this.state.reportList}
                    reportsFavorites={this.state.listReportsFavorites}></ReportList>
            </div>
        );
    }
}

export default ReportListContainer;

// const mapStateToProps = (state:any) => ({user: state.user});
// export default connect(mapStateToProps, null)(ReportListContainer);