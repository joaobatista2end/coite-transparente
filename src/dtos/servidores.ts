export interface ServidoresResponseDto {
  total: number;
  titulo: string;
  detalhe: {
    total__sum: string;
  };
  rows: Array<{
    horas_extras: string;
    codigo_orgao: string;
    nome: string;
    ano: number;
    cpf: string;
    funcionario_id: number;
    mes: number;
    total: string;
    id: number;
    numero_ordem: number;
  }>;
}

export interface ServidoresParamsDto {
  limit: number;
  offset: number;
  mes: number;
  ano: number;
  nome?: string;
  codigo_orgao?: number;
  sort?: string;
  order?: "asc" | "desc";
}
