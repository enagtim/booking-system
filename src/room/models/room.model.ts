import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoomDocument = HydratedDocument<RoomModel>;

@Schema()
class Feedback {
	@Prop({ required: true })
	author: string;

	@Prop({ required: true })
	text: string;

	@Prop({
		type: { city: String, country: String, region: String },
		required: false,
	})
	location?: {
		city?: string;
		country?: string;
		region?: string;
	};

	@Prop({ required: true })
	createdAt: Date;
}
@Schema()
class Location {
	@Prop({ required: true })
	city: string;

	@Prop({ required: true })
	country: string;

	@Prop({ required: true })
	region: string;

	@Prop({ required: true })
	address: string;
}
@Schema()
export class RoomModel {
	@Prop({ type: Types.ObjectId, auto: true })
	_id: Types.ObjectId;

	@Prop({ required: true })
	title: string;

	@Prop({ type: [String] })
	images: string[];

	@Prop({ required: true })
	discription: string;

	@Prop({ required: true })
	countRooms: number;

	@Prop({ type: [String] })
	facilities: string[];

	@Prop({ default: 0 })
	rating: number;

	@Prop({ required: true, type: Location })
	location: Location;

	@Prop({ type: [Feedback] })
	feedback: Feedback[];
}
export const RoomModelSchema = SchemaFactory.createForClass(RoomModel);
