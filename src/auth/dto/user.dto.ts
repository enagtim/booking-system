import { IsString, MinLength, IsNumberString, IsNotEmpty } from 'class-validator';

export enum UserRole {
	ADMIN = 'Администратор',
	USER = 'Пользователь',
}
export class UserDto {
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNumberString()
	@IsNotEmpty()
	phone: number;

	role?: UserRole;
}
