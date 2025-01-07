import { z } from "zod";

import dotenv from "dotenv";
dotenv.config();

const EnvSchema = z.object({
  API_KEY: z.string(),
  API_URL: z.string(),
  IBGE_CITY_CODE: z.string().transform((val) => parseInt(val, 10)),
});

const Env = EnvSchema.parse(process.env);

export default Env;
