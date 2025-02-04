import {
	IsString,
	MinLength,
	IsNumberString,
	IsNotEmpty,
	IsEnum,
	IsOptional,
} from 'class-validator';
import { Role } from '..//../enum/role.enum';

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

	@IsOptional()
	@IsEnum(Role)
	role?: Role;
}
