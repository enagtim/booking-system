import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/booking-api?authSource=admin'),
		RoomModule,
		ScheduleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
