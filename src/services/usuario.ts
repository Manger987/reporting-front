import axios from 'axios';
import { usuarioTipoPerfilsInterface } from './../interfaces/usuario_tipo_perfils';

const logginUser = async (usuario: object) => {
    return await axios.post(`http://localhost:8000/usuario/loggin`, usuario)
    .then(res => res.data)
    .catch(err => {
        console.log("ERROR1:", err.message);
        return err
    });
}

const isAdmin = async (user_areas_perfil: usuarioTipoPerfilsInterface[]) => {
    return user_areas_perfil.find(area => area.perfil_id < 3); //si es Administrador General y Observador General
}

export { logginUser, isAdmin };