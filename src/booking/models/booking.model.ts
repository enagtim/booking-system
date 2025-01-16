import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { RoomModel } from 'src/room/models/room.model';
import { BookingStatus } from '../dto/booking.dto';

export type BookingDocument = HydratedDocument<BookingModel>;

@Schema({ timestamps: true })
export class BookingModel {
	@Prop({ type: Types.ObjectId, ref: RoomModel.name })
	room_id: Types.ObjectId;

	@Prop()
	bookingDate: Date;

	@Prop({ default: 'pending' })
	status: BookingStatus;
}
export const BookingModelSchema = SchemaFactory.createForClass(BookingModel);
