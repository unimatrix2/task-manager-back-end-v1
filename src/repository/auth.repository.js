import UserEntity from '../models/User';

class AuthRepository {
  constructor() {
    this.User = UserEntity.User;
  }

  async findUser(email) {
    const user = this.User.findOne({ email });

    return user;
  }

  async saveUser(body) {
    const newUser = new this.User(body);

    await newUser.save();
  }
}

export default new AuthRepository();
