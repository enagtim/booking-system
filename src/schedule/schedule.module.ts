import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModel, ScheduleModelSchema } from './models/schedule.model';

@Module({
	imports: [MongooseModule.forFeature([{ name: ScheduleModel.name, schema: ScheduleModelSchema }])],
	controllers: [ScheduleController],
	providers: [ScheduleService],
})
export class ScheduleModule {}
