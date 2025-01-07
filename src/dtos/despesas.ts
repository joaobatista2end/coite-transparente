export interface DespesaParams {
  ano: number;
  codigoIBGE: string; // Código do município no IBGE
  pagina?: number;
  tamanho?: number;
}

export interface Despesa {
  id: string;
  orgao: string;
  tipoDespesa: string;
  valor: number;
  data: string;
}
