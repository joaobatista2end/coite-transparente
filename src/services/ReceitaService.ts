import { Despesa, DespesaParams } from "../dtos/despesas";
import APIService from "./APIService";

export class ReceitaService extends APIService {
  async all(params: DespesaParams): Promise<Despesa[]> {
    return this.fetch<Despesa[]>("/receitas", params);
  }
}
