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

  async vefifyExistentUser({ email }) {
    const user = await this.authRepo.findUser(email);

    if (user) {
      throw new ApplicationError({ message: 'User already exists', type: 'Auth-Signup', status: 400 });
    }
  }
}

export default new AuthService();
