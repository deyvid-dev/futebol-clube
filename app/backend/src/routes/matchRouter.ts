import { Router } from 'express';
import { matchValidateToken } from '../middlewares/jwtToken';
import MatchController from '../controllers/matchController';

const router = Router();
const matchC = new MatchController();

router.get('/matches', matchC.getAll);
router.post('/matches', matchValidateToken, matchC.create);
router.patch('/matches/:id', matchC.update);
router.patch('/matches/:id/finish', matchC.finish);

export default router;
