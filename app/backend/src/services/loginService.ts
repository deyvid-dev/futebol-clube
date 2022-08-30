import ILogin from '../interfaces/LoginInterface';
import User from '../database/models/user';
import { tokenGenerate } from '../middlewares/jwtToken';

const loginService = async (payload: ILogin) => {
  const login = await User.findOne({ where: { email: payload.email } });

  if (!login) throw new Error('Incorrect email');

  const { id, username, role, email } = login;

  const token = await tokenGenerate({ id, username, role, email });

  return { token };
};

export default loginService;
