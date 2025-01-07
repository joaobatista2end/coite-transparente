import { ServidoresParamsDto, ServidoresResponseDto } from "../dtos/servidores";
import APIService from "./APIService";

export class ServidoresService extends APIService {
  async all(params: ServidoresParamsDto): Promise<ServidoresResponseDto> {
    return this.fetch<ServidoresResponseDto>(
      "/pessoal/json-servidores/",
      params
    );
  }
}
