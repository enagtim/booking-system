import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoomModel } from 'src/room/models/room.model';

export type ScheduleDocument = HydratedDocument<ScheduleModel>;

export enum BookingStatus {
	PENDING = 'pending',
	COMPLETED = 'completed',
	REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class ScheduleModel {
	@Prop({ type: Types.ObjectId, auto: true })
	_id: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: RoomModel.name })
	room_id: Types.ObjectId;

	@Prop({ required: true })
	bookingDate: Date;

	@Prop({ required: true, enum: BookingStatus, default: BookingStatus.PENDING })
	status: BookingStatus;

	@Prop({ required: false })
	deletedAt?: Date;
}
export const ScheduleModelSchema = SchemaFactory.createForClass(ScheduleModel);
