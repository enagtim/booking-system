import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '..//../enum/role.enum';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true })
export class UserModel {
	@Prop({ unique: true })
	email: string;

	@Prop()
	password: string;

	@Prop()
	name: string;

	@Prop()
	phone: number;

	@Prop({ enum: Role, default: Role.USER })
	role: Role;
}
export const UserModelSchema = SchemaFactory.createForClass(UserModel);
