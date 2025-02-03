import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get('find')
	@HttpCode(200)
	public async getUserByEmail(@Query() email: string) {
		return this.userService.findUser(email);
	}

	@Get('profile')
	@HttpCode(200)
	public async getUserProfile(@Query() id: string) {
		return this.userService.getUserProfile(id);
	}
}
