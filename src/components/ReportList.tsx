import React from 'react';
import PropTypes from 'prop-types';
import {Container, Navbar} from 'react-bootstrap'
import './styles.css';

const ReportList = ({ reports, reportsFavorites }: any) => {
        return (
            <div>
                <div className="wrapper">
                    <div className="one">
                    <Container>
                        <Navbar expand="lg" variant="light" bg="light">
                            <Navbar.Brand href="#">Navbar</Navbar.Brand>
                        </Navbar>
                    </Container>
                    </div>
                    <div className="three">
                        <div>
                            { reports.map((report: any) => (
                                <div key={report.id}>{report.nombre}</div>
                            ))}
                        </div>
                        <div>
                            { reportsFavorites.map((report: any) => (
                                <div key={report.id}>{report.nombre}</div>
                            ))}
                        </div>
                    </div>
                    <div className="two">
                            DOS
                    </div>
                </div>
                
                <div className="container-fluid">
                
                </div>
            </div>
        );
}

ReportList.propTypes = {
    reports: PropTypes.array.isRequired,
    reportsFavorites: PropTypes.array.isRequired
}

export default ReportList;

