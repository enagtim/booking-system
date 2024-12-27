import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoomModel } from 'src/room/models/room.model';

export type BookingDocument = HydratedDocument<BookingModel>;

export enum BookingStatus {
	PENDING = 'pending',
	COMPLETED = 'completed',
	REJECTED = 'rejected',
}

@Schema({ timestamps: true })
export class BookingModel {
	@Prop({ type: Types.ObjectId, auto: true })
	_id: Types.ObjectId;

	@Prop({ type: Types.ObjectId, ref: RoomModel.name })
	room_id: Types.ObjectId;

	@Prop()
	bookingDate: Date;

	@Prop({ enum: BookingStatus, default: BookingStatus.PENDING })
	status: BookingStatus;

	@Prop({ required: false })
	deletedAt?: Date;
}
export const BookingModelSchema = SchemaFactory.createForClass(BookingModel);
