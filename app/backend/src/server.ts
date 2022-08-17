import { App } from './app';
import 'dotenv/config';
// Iniciando projeto !
const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
