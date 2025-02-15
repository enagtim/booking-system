import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { UserModel } from '../users/models/user.model';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService,
	) {}

	@Post('register')
	public async register(@Body() dto: UserDto): Promise<UserModel> {
		return this.userService.createUser(dto);
	}

	@Post('login')
	public async login(@Body() { email, password }: AuthDto) {
		const user = await this.authService.validateUser(email, password);
		return this.authService.login(user);
	}
}
