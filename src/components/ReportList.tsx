import React from 'react';
import PropTypes from 'prop-types';

const ReportList = ({ reports }: any) => {
        return (
            <div>
                { reports.map((report: any) => (
                    <div key={report.id}>{report.nombre}</div>
                ))}
            </div>
        );
}

ReportList.propTypes = {
    reports: PropTypes.array.isRequired,
}

export default ReportList;

