import {usuarioTipoPerfilsInterface} from './usuario_tipo_perfils';

export interface userInterface {
    id: Number
    nombre: String
    apellido_paterno: String
    apellido_materno: String
    username: String
    usuario_sad_id: Number
    password: String
    createdAt: Date
    updatedAt: Date
    usuario_tipo_perfils: usuarioTipoPerfilsInterface[]
    token: Number
}

export const userStructure = {
    id : 0,
    nombre : '',
    apellido_paterno : '',
    apellido_materno : '',
    username : '',
    usuario_sad_id : 0,
    password : '',
    createdAt : '',
    updatedAt : '',
    usuario_tipo_perfils : [],
    token : ''
}