import axios from 'axios';
import { usuarioTipoPerfilsInterface } from './../interfaces/usuario_tipo_perfils';
//import { tipoInterface } from './../interfaces/tipo';
import { isAdmin } from './usuario';

const getAllTypes = async () => {
    return await axios.get(`http://localhost:8000/tipo/list`)
    .then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => console.log("Error getListReportsViews: ",err.response.data));
}

const getListTypes = async (user_areas_perfil: usuarioTipoPerfilsInterface[]) => {
    // const areas = await getAllTypes();
    // console.log("beforFiler:",user_areas_perfil)
    // const userAdmin = await isAdmin(user_areas_perfil);
    const usuario_tipos = user_areas_perfil.map(areas => areas.tipo_id);
    console.log("usuario_tipos:", usuario_tipos);
    return await Promise.all([getAllTypes(), isAdmin(user_areas_perfil)]).then( async (result: any) => {
        if(result[1] && result[1].perfil_id) { //VALIDAR ESTO PQ SE ESTA METIENDO AUNQUE CAMBIE EL PERFIL ID DEL ID=1 de la tabla usuario_tipo_perfil
            console.log("retornare", result[0]);
            return result[0];
        }else{
            const retornare = await result[0].filter((area:any) => area.tipo_id, usuario_tipos);
            console.log("retornare2", retornare);
            return retornare;
        }
    })
    // console.log('userAdmin:', userAdmin);
    //if(userAdmin && userAdmin.tipo_id)
    // return areas;
}

export { getListTypes, getAllTypes };