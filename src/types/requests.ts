export interface PaginacaoResponse<T> {
  dados: T[];
  total: number;
  pagina: number;
  tamanho: number;
}
