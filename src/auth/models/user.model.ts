import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '../dto/user.dto';
import { HydratedDocument } from 'mongoose';

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

	@Prop({ enum: UserRole, default: UserRole.USER })
	role: UserRole;
}
export const UserModelSchema = SchemaFactory.createForClass(UserModel);
