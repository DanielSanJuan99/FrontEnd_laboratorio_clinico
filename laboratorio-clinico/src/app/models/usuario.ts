import { Laboratorio } from "./laboratorio"

export interface Rol {
    id: number
    nombre?: string
}

export interface Usuario {
    id: number
    nombre: string
    apellido: string
    email: string
    password?: string
    rol?: Rol
    laboratorio?: Laboratorio
}
