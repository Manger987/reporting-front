import axios from 'axios';

const getReports = async () => {
    return await axios.get(`http://localhost:8000/reporte/list`)
    .then(res => {
        console.log("AJIJIJI:", res.data);
        return res.data;
    });
}

const getListReportsFavorites = async (usuario_id: number) => {
    return await axios.get(`http://localhost:8000/reporte/listReportsFavorites/${usuario_id}`)
    .then(res => {
        console.log("jojooj:", res.data);
        return res.data;
    });
}

export { getReports, getListReportsFavorites };