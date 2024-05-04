import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
