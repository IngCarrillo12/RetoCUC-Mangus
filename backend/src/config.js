import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtén el directorio actual en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura dotenv con la ruta del archivo .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT;
export const PORT = process.env.PORT;
