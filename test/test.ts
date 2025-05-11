import dotenv from "dotenv";
import { Groundhogg } from "groundhogg-js";
dotenv.config();

const gh = new Groundhogg({
  baseUrl: process.env.GROUNDHOGG_API_URI!,
  publicKey: process.env.GROUNDHOGG_PUBLIC_KEY!,
  token: process.env.GROUNDHOGG_TOKEN!,
  defaultFrom: process.env.TEST_FROM!,
});
