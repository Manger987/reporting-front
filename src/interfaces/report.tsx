import { FileInterface } from './file';

export interface reportInterface {
    id?: Number
    nombre: string
    descripcion: string
    url: string
    vista_reporte: number
    fecha_visualizacion?: Date
    usuario_creador?: number
    archivo?: string
    reporte_archivo?: FileInterface[]
    createdAt?: Date
    updatedAt?: Date
}

export const reportStructure = {
    nombre: '',
    descripcion: '',
    url: '',
    vista_reporte: 0,
    usuario_creador: 0,
    reporte_archivo: []
}