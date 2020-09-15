

export interface tipoInterface {
    id: Number
    tipo_id: Number
    descripcion_tipo: String
    nombre: String
    createdAt: Date
    updatedAt: Date,
    edit?: boolean
}

export const tipoStructure = {
    id : 0,
    tipo_id : 0,
    descripcion_tipo : '',
    nombre : '',
    createdAt : '000-00-00',
    updatedAt : '000-00-00',
    edit:false
}