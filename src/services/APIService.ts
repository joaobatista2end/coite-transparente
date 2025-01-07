import Env from "../environment/Env";

abstract class APIService {
  protected API_BASE_URL: string;
  protected API_KEY: string;
  protected IBGE_CITY_CODE: number;

  constructor() {
    this.API_BASE_URL = Env.API_URL;
    this.API_KEY = Env.API_KEY;
    this.IBGE_CITY_CODE = Env.IBGE_CITY_CODE;
  }

  protected async fetch<T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    const url = new URL(`${this.API_BASE_URL}${endpoint}`);
    params = params ?? {};
    params["codigoIbge"] = this.IBGE_CITY_CODE;

    Object.keys(params).forEach((key) => {
      if (params?.[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url.toString(), {
      headers: {
        "chave-api-dados": this.API_KEY,
        "X-Requested-With": "XMLHttpRequest",
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    try {
      return JSON.parse(responseText) as T;
    } catch (error) {
      throw new Error(`Erro ao analisar JSON: ${(error as any).message}`);
    }
  }
}

export default APIService;
