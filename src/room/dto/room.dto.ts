import { IsArray, IsNumber, IsString, Max, Min } from 'class-validator';

export class IRoomModelDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@Min(1)
	@Max(5)
	@IsNumber()
	countRooms: number;

	@IsArray()
	facilities: string[];
}
