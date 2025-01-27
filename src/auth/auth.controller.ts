import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserModel } from './models/user.model';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	@HttpCode(201)
	public async register(@Body() dto: UserDto): Promise<UserModel> {
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post('login')
	@HttpCode(200)
	public async login(@Body() { email, password }: AuthDto) {
		const user = await this.authService.validateUser(email, password);
		return this.authService.login(user.email);
	}
}
