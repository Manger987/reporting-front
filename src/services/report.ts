import axios from 'axios';

const getReports = async () => {
    return await axios.get(`http://localhost:8000/reporte/list`)
    .then(res => {
        console.log("AJIJIJI:", res.data);
        return res.data;
    });
}

export { getReports }