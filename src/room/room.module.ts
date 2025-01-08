import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModel, RoomModelSchema } from './models/room.model';

@Module({
	imports: [MongooseModule.forFeature([{ name: RoomModel.name, schema: RoomModelSchema }])],
	exports: [MongooseModule],
	controllers: [RoomController],
	providers: [RoomService],
})
export class RoomModule {}
