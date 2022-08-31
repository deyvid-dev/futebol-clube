import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();
const TeamsC = new TeamsController();

router.get('/teams', TeamsC.getAll);
router.get('/teams/:id', TeamsC.getByPk);

export default router;
