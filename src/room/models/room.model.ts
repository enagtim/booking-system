import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoomDocument = HydratedDocument<RoomModel>;

@Schema()
class Location {
	@Prop()
	city: string;

	@Prop()
	country: string;

	@Prop()
	region: string;

	@Prop()
	address: string;
}
@Schema({ timestamps: true })
class Feedback {
	@Prop()
	author: string;

	@Prop()
	text: string;

	@Prop({ type: Location, required: false })
	location?: Location;
}
@Schema()
export class RoomModel {
	@Prop({ type: Types.ObjectId, auto: true })
	_id: Types.ObjectId;

	@Prop()
	title: string;

	@Prop({ type: () => [String] })
	images: string[];

	@Prop()
	discription: string;

	@Prop()
	countRooms: number;

	@Prop({ type: () => [String] })
	facilities: string[];

	@Prop({ default: 0 })
	rating: number;

	@Prop({ type: Location })
	location: Location;

	@Prop({ type: () => [Feedback] })
	feedback: Feedback[];

	@Prop()
	deletedAt?: Date;
}
export const RoomModelSchema = SchemaFactory.createForClass(RoomModel);
