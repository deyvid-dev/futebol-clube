import * as express from 'express';
import loginRouter from './routes/loginRouter';
import teamsRouter from './routes/teamsRouter';
import matchRouter from './routes/matchRouter';
import leaderRouter from './routes/leaderRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(loginRouter);
    this.app.use(teamsRouter);
    this.app.use(matchRouter);
    this.app.use(leaderRouter);

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
