import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<RoomModel>;

@Schema({ timestamps: true })
export class RoomModel {
	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	roomNumber: number;

	@Prop()
	numberOfRooms: number;

	@Prop({ type: () => [String] })
	facilities: string[];
}
export const RoomModelSchema = SchemaFactory.createForClass(RoomModel);
