import axios from 'axios';
import { isAuthUser } from './authService';

const getReports = async () => {
    console.log("isAuthUser", isAuthUser().token);
    return await axios.get(`http://localhost:8000/reporte/list`, { headers:{'access-token': isAuthUser().token}})
    .then(res => {
        return res.data;
    });
}

const getAllReportsByUser = async (userio_id: number) => {
    return await axios.get(`http://localhost:8000/reporte/listReportsByUser/${userio_id}`, { headers:{'access-token': isAuthUser().token}})
    .then(res => {
        return res.data;
    }).catch(err => console.log("Error getAllReportsByUser: ",err.response.data));
}

const getListReportsFavorites = async (usuario_id: number) => {
    return await axios.get(`http://localhost:8000/reporte/listReportsFavorites/${usuario_id}`)
    .then(res => {
        return res.data;
    }).catch(err => console.log("Error getListReportsFavorites: ",err.response.data));
}

const getListReportsViews = async (usuario_id: number) => {
    return await axios.get(`http://localhost:8000/reporte/listReportsViewed/${usuario_id}`)
    .then(res => {
        return res.data;
    }).catch(err => console.log("Error getListReportsViews: ",err.response.data));
}

const getListReportsArea = async (tipo_id: number) => {
    const usuario =  isAuthUser();
    return await axios.get(`http://localhost:8000/reporte/findAllReportsByType/${tipo_id}/${usuario.id}`)
    .then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => console.log("Error getListReportsArea: ",err.response.data));
}

const addFavorite = async (dataReport: object) => {
    console.log("fe:",dataReport);
    return await axios.post(`http://localhost:8000/reporte/addFavorite`, dataReport)
    .then(res => {
        return res.data;
    }).catch(err => console.log("Error addFavorite: ",err.response.data));
}

export { getReports, getListReportsFavorites, getAllReportsByUser, getListReportsViews, getListReportsArea, addFavorite };