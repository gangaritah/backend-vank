import bcrypt from 'bcrypt';
import { connectSequelize } from '../database/sequelize.js';
import User from '../dto/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


class UserRepository {


  async register(info) {
    const hashedPassword = await bcrypt.hash(info.password, 10);
    info.password = hashedPassword;
    const user = await User.create(info);
    return "ok";
  }

  async login(info) {
    try {
      const email = info.email;
      const password = info.password;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return {login: false};
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return {login: false};
      }

      const token = jwt.sign(
        { userEmail: email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
      );
      return {login: true, token}

    } catch (error) {
      console.error(error);
    }
  }

  async profile(email) {
    const user = await User.findOne({
       attributes: ['email', 'name', 'last_name'],
        where: { email: email }
    });

    return user.dataValues;
  }

}

export default UserRepository;