import { Router } from 'express';
import MatchController from '../controllers/matchController';

const router = Router();
const matchC = new MatchController();

router.get('/matches', matchC.getAll);
router.post('/matches', matchC.create);
router.patch('/:id/finish', matchC.finish);

export default router;
