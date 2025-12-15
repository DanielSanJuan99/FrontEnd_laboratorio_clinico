export interface Convenio {
    id: number,
    nombre?: string
}

export interface Laboratorio {
    id: number
    nombre: string
    telefono: string
    webUrl: string
    email: string
    convenio?: Convenio
}
export interface LaboratorioDTO {
    id?: number
    nombre: string
    telefono: string
    webUrl?: string
    email: string
    convenioId: number
}