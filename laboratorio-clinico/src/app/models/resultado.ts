export interface TipoEntidad {
  id: number;
  nombre?: string;
}

export interface Resultado {
  id: number;
  valorResultado: number;
  valorRefMin: number;
  valorRefMax: number;
  observacion: string;
  fechaExamen: string; // Vendra como string 'YYYY-MM-DD'
  laboratorioId: number;
  usuarioId: number;
  tipoExamen?: TipoEntidad;
  tipoParametro?: TipoEntidad;
  unidadMedida?: TipoEntidad;
}

export interface ResultadoDTO {
  id?: number;
  valorResultado: number;
  valorRefMin: number;
  valorRefMax: number;
  observacion: string;
  fechaExamen: string;
  laboratorioId: number;
  usuarioId: number;
  tipoExamenId: number;
  tipoParametroId: number;
  unidadMedidaId: number;
}