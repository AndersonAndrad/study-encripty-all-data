import { Iuser } from './user.interface';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get()
  findAllUsers() {
    return this.UserService.findAllUsers();
  }

  @Get(':id')
  async findOnlyUser(@Param('id') id: string) {
    return await this.UserService.findOnlyUser(id);
  }

  @Post()
  createUser(@Body() data: Iuser) {
    return this.UserService.createUser(data);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: Iuser) {
    return this.UserService.updateUser(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.UserService.deleteUser(id);
  }
}
