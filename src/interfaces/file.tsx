export interface FileInterface {
    id?: Number
    reporte_id?: Number
    nombre_archivo: string
    ubicacion?: string
    activo?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export const FileStructure = {
    nombre_archivo: '',
    ubicacion: '',
    activo: 0,
}