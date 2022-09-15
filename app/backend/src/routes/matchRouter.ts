import { Router } from 'express';
import MatchController from '../controllers/matchController';

const router = Router();
const matchC = new MatchController();

router.get('/matches', matchC.getAll);

export default router;
