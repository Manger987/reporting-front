import axios from 'axios';
import { isAuthUser } from './authService';

const getReports = async () => {
    console.log("isAuthUser", isAuthUser().token);
    return await axios.get(`http://localhost:8000/reporte/list`, { headers:{'access-token': isAuthUser().token}})
    .then(res => {
        return res.data;
    });
}

const getListReportsFavorites = async (usuario_id: number) => {
    return await axios.get(`http://localhost:8000/reporte/listReportsFavorites/${usuario_id}`)
    .then(res => {
        return res.data;
    });
}

export { getReports, getListReportsFavorites };