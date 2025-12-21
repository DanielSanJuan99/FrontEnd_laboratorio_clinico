export interface Convenio {
    id: number,
    nombre?: string
}

// Modelo de Laboratorio para GET
export interface Laboratorio {
    id: number
    nombre: string
    telefono: string
    webUrl: string
    email: string
    convenio?: Convenio
}

// Modelo de Laboratorio para POST y PUT
export interface LaboratorioDTO {
    id?: number
    nombre: string
    telefono: string
    webUrl?: string
    email: string
    convenioId: number
}