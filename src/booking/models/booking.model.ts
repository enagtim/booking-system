import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoomModel } from '..//../room/models/room.model';
import { BookingStatus } from '..//../enum/booking.status.enum';

export type BookingDocument = HydratedDocument<BookingModel>;

@Schema({ timestamps: true })
export class BookingModel {
	@Prop({ type: Types.ObjectId, ref: RoomModel.name })
	room_id: Types.ObjectId;

	@Prop()
	bookingStartDate: Date;

	@Prop()
	bookingEndDate: Date;

	@Prop({ enum: BookingStatus, default: BookingStatus.PENDING })
	status: BookingStatus;
}
export const BookingModelSchema = SchemaFactory.createForClass(BookingModel);
