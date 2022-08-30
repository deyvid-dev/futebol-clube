import { Router } from 'express';
import validateUser from '../middlewares/validationUser';
import LoginController from '../controllers/loginController';
import { tokenMiddleware } from '../middlewares/jwtToken';

const router = Router();

router.post('/login', validateUser, LoginController.login);
router.get('/login/validate', tokenMiddleware, LoginController.role);

export default router;
