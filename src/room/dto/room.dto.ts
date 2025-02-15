import { IsArray, IsNumber, IsString, Max, Min } from 'class-validator';

export class RoomModelDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsNumber()
	@Min(1)
	roomNumber: number;

	@Min(1)
	@Max(5)
	@IsNumber()
	numberOfRooms: number;

	@IsArray()
	facilities: string[];
}
