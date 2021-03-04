import { Iuser } from './user.interface';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as hash from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import token from '../config/auth.config';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers() {
    return await this.UserRepository.find();
  }

  async findOnlyUser(id: string) {
    return await this.UserRepository.findOne(id);
  }

  async createUser(data: Iuser) {
    const encryptedData = jwt.sign('anderson', token.pass);
    const decryptedData = jwt.verify(encryptedData, token.pass);
    return {
      encryptedData,
      decryptedData,
    };
    // return await this.UserRepository.save(this.UserRepository.create(data));
  }

  async updateUser(id: string, data: Iuser) {
    await this.UserRepository.update(id, data);
    return await this.UserRepository.findOne(id);
  }

  async deleteUser(id: string) {
    const user = await this.UserRepository.findOne(id);
    await this.UserRepository.delete(id);
    return { user, deleted: true };
  }
}
