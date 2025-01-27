import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
