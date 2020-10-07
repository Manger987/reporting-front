import axios from 'axios';
import { usuarioTipoPerfilsInterface } from './../interfaces/usuario_tipo_perfils';
//import { tipoInterface } from './../interfaces/tipo';
import { isAdmin } from './usuario';

const getAllTypes = async () => {
    return await axios.get(`http://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/tipo/list`)
    .then(res => {
        return res.data;
    }).catch(err => console.log("Error getListReportsViews: ",err.response.data));
}

const getTypesAreas = async () => {
    return await axios.get(`http://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_PORT}/tipo/getTypesAreas`)
    .then(res => {
        return res.data;
    }).catch(err => console.log("Error getTypesAreas: ",err.response.data));
}

const getListTypes = async (user_areas_perfil: usuarioTipoPerfilsInterface[]) => {

    const usuario_tipos = user_areas_perfil.map(areas => areas.tipo_id);
    return await Promise.all([getAllTypes(), isAdmin(user_areas_perfil)]).then( async (result: any) => {
        if(result[1] && result[1].perfil_id) {
            return result[0];
        }else{
            return await result[0].filter((area:any) => (usuario_tipos.indexOf(area.id) !== -1) ? area : null);
        }
    })
}

export { getListTypes, getAllTypes, getTypesAreas };