import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IUserDto } from './dto/user.dto';
import { UserModel } from './models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	@HttpCode(201)
	public async register(@Body() dto: IUserDto): Promise<UserModel> {
		return this.authService.register(dto);
	}
}
