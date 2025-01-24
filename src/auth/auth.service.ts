import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './models/user.model';
import { IUserDto } from './dto/user.dto';
import { USER_DATA_IS_REQUIRED } from '../messages/error.messages';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) {}
	public async register(dto: IUserDto): Promise<UserModel> {
		const passwordHash = await hash(dto.password, 12);
		const newUser = new this.userModel({ ...dto, password: passwordHash });
		if (!newUser) {
			throw new BadRequestException(USER_DATA_IS_REQUIRED);
		}
		return newUser.save();
	}
}
