import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './models/user.model';
import { IUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { USER_IS_EXISTED } from '../messages/error.messages';

@Injectable()
export class AuthService {
	constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) {}
	public async register(dto: IUserDto): Promise<UserModel> {
		const existedUser = await this.userModel.findOne({ email: dto.email }).exec();
		if (existedUser) {
			throw new BadRequestException(USER_IS_EXISTED);
		}
		const passwordHash = await hash(dto.password, 12);
		const newUser = new this.userModel({ ...dto, password: passwordHash });
		return newUser.save();
	}
}
