import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModel, ScheduleModelSchema } from './models/schedule.model';
import { RoomModel, RoomModelSchema } from 'src/room/models/room.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: ScheduleModel.name, schema: ScheduleModelSchema },
			{ name: RoomModel.name, schema: RoomModelSchema },
		]),
	],
	controllers: [ScheduleController],
	providers: [ScheduleService],
})
export class ScheduleModule {}
