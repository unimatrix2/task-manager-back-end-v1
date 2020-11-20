import jwt from 'jsonwebtoken';

import authRepository from '../repository/auth.repository';
import passwordUtils from '../utils/password.utils';
import ApplicationError from '../errors/ApplicationError';

class AuthService {
  constructor() {
    this.authRepo = authRepository;
  }

  async register(body) {
    try {
      await this.vefifyExistentUser(body);

      const newUser = { ...body, password: passwordUtils.encrypt(body.password) };

      await this.authRepo.saveUser(newUser);
    } catch (error) {
      throw new ApplicationError(error);
    }
  }

  async authenticateUser(userCredentials) {
    // buscar user pelo email (jogar um erro caso nao encontre)
    // validar a senha enviada com a senha que veio do banco usando o bcrypt
    // autentica o usuario (gerar  uma token JWT e retornar no response do controller)

    const userFromDb = await this.authRepo.findUser(userCredentials.email);

    if (!userFromDb) {
      throw new ApplicationError({ message: 'Wrong Credentials', type: 'Auth-Login-Invalid-Credentials', status: 400 });
    }

    const isPasswordValid = passwordUtils.verify(userCredentials.password, userFromDb.password);

    if (!isPasswordValid) {
      throw new ApplicationError({ message: 'Wrong Credentials', type: 'Auth-Login-Invalid-Credentials', status: 400 });
    }

    const token = jwt.sign(
      { id: userFromDb._id },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.EXPIRATION_AUTH_TOKEN },
    );

    return token;
  }

  async vefifyExistentUser({ email }) {
    const user = await this.authRepo.findUser(email);

    if (user) {
      throw new ApplicationError({ message: 'User already exists', type: 'Auth-Signup', status: 400 });
    }
  }
}

export default new AuthService();
