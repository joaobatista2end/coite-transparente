import APIService from "./APIService";

interface BolsaFamiliaParams {
  pagina?: number;
  mesAno: string;
}

interface BolsaFamiliaMunicipio {
  codigoIBGE: string;
  nomeIBGE: string;
  codigoRegiao: string;
  nomeRegiao: string;
  pais: string;
  uf: {
    sigla: string;
    nome: string;
  };
}

interface BolsaFamiliaTipo {
  id: number;
  descricao: string;
  descricaoDetalhada: string;
}

interface BolsaFamiliaResponse {
  id: number;
  dataReferencia: string;
  municipio: BolsaFamiliaMunicipio;
  tipo: BolsaFamiliaTipo;
  valor: number;
  quantidadeBeneficiados: number;
}

class BolsaFamiliaService extends APIService {
  async byYear(params: BolsaFamiliaParams): Promise<BolsaFamiliaResponse[]> {
    params.pagina = params.pagina ?? 1;

    // Log para depuração
    console.log("URL:", `${this.API_BASE_URL}/bolsa-familia-por-municipio`);
    console.log("Parâmetros:", params);

    return this.fetch<BolsaFamiliaResponse[]>(
      "/bolsa-familia-por-municipio",
      params
    );
  }

  async totalPorAno(year: number): Promise<{
    totalValue: number;
    totalValueFormatted: string;
    monthlyBeneficiaries: { month: string; beneficiaries: number }[];
  }> {
    let totalValue = 0;
    const monthlyBeneficiaries: {
      month: string;
      beneficiaries: number;
      value: number;
      valueFormatted: string;
    }[] = [];

    for (let month = 1; month <= 12; month++) {
      const mesAno = `${year}${month.toString().padStart(2, "0")}`;
      const params: BolsaFamiliaParams = { mesAno, pagina: 1 };

      const responses = await this.byYear(params);
      const monthlyValue = responses.reduce(
        (sum, response) => sum + response.valor,
        0
      );
      const monthlyBeneficiariesCount = responses.reduce(
        (sum, response) => sum + response.quantidadeBeneficiados,
        0
      );

      totalValue += monthlyValue;
      const formattedMonth = new Date(year, month - 1).toLocaleString("pt-BR", {
        month: "long",
      });

      monthlyBeneficiaries.push({
        month: formattedMonth,
        beneficiaries: monthlyBeneficiariesCount,
        value: monthlyValue,
        valueFormatted: monthlyValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      });
    }

    return {
      totalValue,
      totalValueFormatted: totalValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      monthlyBeneficiaries,
    };
  }
}

export default BolsaFamiliaService;
