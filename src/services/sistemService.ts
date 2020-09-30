import axios from 'axios';
import { FileInterface } from './../interfaces/file';

const uploadFileService = async (dataFile: any) => {
    return await axios.post(`http://localhost:8000/sistem/uploadFile`, dataFile, {
        onUploadProgress: ProgressEvent => {
            return (ProgressEvent.loaded / ProgressEvent.total*100);
      },
    })
    .then(async res => {
        let returnData: any = [];//FileInterface[];
        await res.data.map((file :any) => {
            returnData.push({
                nombre_archivo: file.filename,
                ubicacion: file.destination,
                activo: 1
            });
        });
        return returnData;
    }).catch(err => console.log("Error addFavorite: ",err));
}

export { uploadFileService };