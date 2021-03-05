import { Iuser } from './user.interface';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import token from '../config/auth.config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers() {
    const users = await this.UserRepository.find();

    const allUsers = [];

    users.map((user) => {
      allUsers.push({
        id: user.id,
        name: jwt.verify(user.name, token.pass),
        email: jwt.verify(user.email, token.pass),
      });
    });

    return allUsers;
  }

  async findOnlyUser(id: string) {
    const user = await this.UserRepository.findOne(id);

    if (!(await user)) {
      return { error: 'user do not exist' };
    }

    return {
      id: user.id,
      name: jwt.verify(user.name, token.pass),
      email: jwt.verify(user.email, token.pass),
    };
  }

  async createUser(data: Iuser) {
    const { name, email, password } = data;

    const existingUser = await this.UserRepository.find({
      where: { email: jwt.sign(email, token.pass) },
    });

    if (!((await existingUser.length) === 0)) {
      return {
        error: 'This user already exists in our database',
      };
    }

    return await this.UserRepository.save(
      this.UserRepository.create({
        name: jwt.sign(name, token.pass),
        email: jwt.sign(email, token.pass),
        password: jwt.sign(password, token.pass),
      }),
    );
  }

  async updateUser(id: string, data: Iuser) {
    const { name, email, password } = data;

    await this.UserRepository.update(id, {
      name: jwt.sign(name, token.pass),
      email: jwt.sign(email, token.pass),
      password: jwt.sign(password, token.pass),
    });

    const user = await this.UserRepository.findOne(id);

    return {
      id: user.id,
      name: jwt.verify(user.name, token.pass),
      email: jwt.verify(user.email, token.pass),
    };
  }

  async deleteUser(id: string) {
    const user = await this.UserRepository.findOne(id);

    if (!(await user)) {
      return { error: 'user do not exist' };
    }

    await this.UserRepository.delete(id);
    return { id: user.id, deleted: true };
  }
}
