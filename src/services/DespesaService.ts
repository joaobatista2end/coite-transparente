import { Despesa, DespesaParams } from "../dtos/despesas";
import APIService from "./APIService";

export class DespesasService extends APIService {
  async all(params: DespesaParams): Promise<Despesa[]> {
    return this.fetch<Despesa[]>("/despesas", params);
  }
}
