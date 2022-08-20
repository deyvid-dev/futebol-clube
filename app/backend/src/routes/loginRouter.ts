import { Router } from 'express';
import validateUser from '../middlewares/validationUser';
import LoginController from '../controllers/loginController';

const router = Router();

router.post('/login', validateUser, LoginController.login);

export default router;
