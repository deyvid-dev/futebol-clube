import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();
const TeamsC = new TeamsController();

router.get('/teams', TeamsC.getAll);

export default router;
