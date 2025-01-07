export interface ReceitaParams {
  ano: number;
  codigoIBGE: string;
  pagina?: number;
  tamanho?: number;
}

export interface Receita {
  id: string;
  tipoReceita: string;
  valor: number;
  data: string;
}
