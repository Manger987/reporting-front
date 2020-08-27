import axios from 'axios';

const api_key = "c2d47967a7bd9ad741ea26d876b29fce";

const getReports = async () => {
    return await axios.get(`http://localhost:8000/reporte/list`)
    .then(res => res.data);
}

export { getReports }