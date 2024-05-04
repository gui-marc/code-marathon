import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  // GET /users
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
