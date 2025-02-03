import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get('profile/:id')
	@HttpCode(200)
	public async getUserProfile(@Query('id') id: string) {
		return this.userService.findProfile(id);
	}
}
