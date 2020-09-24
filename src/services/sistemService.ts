import axios from 'axios';

const uploadFile = async (dataFile) => {
    console.log("dataFile", dataFile);
    return await axios.get(`http://localhost:8000/reporte/list`, { headers:{'access-token': isAuthUser().token}})
    .then(res => {
        return res.data;
    });
}

export { uploadFile };