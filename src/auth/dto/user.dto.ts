import { IsString, MinLength, IsEnum, IsNumberString } from 'class-validator';

export enum UserRole {
	ADMIN = 'Администратор',
	USER = 'Пользователь',
}
export class IUserDto {
	@IsString()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;

	@IsString()
	name: string;

	@IsNumberString()
	phone: number;

	@IsEnum(UserRole)
	role?: UserRole;
}
