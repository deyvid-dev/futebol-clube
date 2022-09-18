import { Router } from 'express';
import LeaderController from '../controllers/leaderController';

const router = Router();
const leaderC = new LeaderController();

router.get('/leaderboard/home', leaderC.leaderH);
router.get('/leaderboard/away', leaderC.leaderA);

export default router;
