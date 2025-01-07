import express from "express";
import { ServidoresService } from "./services/ServidoresService";
import { ServidoresParamsDto } from "./dtos/servidores";
import BolsaFamiliaService from "./services/BolsaFamilia";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições
app.use(express.json());

// Rota de exemplo
app.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

const bolsaFamiliaService = new BolsaFamiliaService();

app.get("/bolsa-familia", async (req, res) => {
  try {
    const params = {
      pagina: req.query.pagina ? parseInt(req.query.pagina as string, 10) : 1,
      mesAno: req.query.mesAno as string,
    };

    const data = await bolsaFamiliaService.byYear(params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

app.get("/bolsa-familia/ano", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const year = parseInt(req.query?.ano as string) ?? currentYear;
    const data = await bolsaFamiliaService.totalPorAno(year);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
