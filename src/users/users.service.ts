import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel, UserDocument } from './models/user.model';
import { UserDto } from './dto/user.dto';
import { ERROR_MESSAGES } from '../messages/error.messages';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) {}
	public async createUser(dto: UserDto): Promise<UserModel> {
		const user = await this.userModel.findOne({ email: dto.email });
		if (user) {
			throw new BadRequestException(ERROR_MESSAGES.REGISTER_ERROR);
		}
		const passwordHash = await hash(dto.password, 12);
		const newUser = new this.userModel({ ...dto, password: passwordHash });
		return newUser.save();
	}
	public async findProfile(id: string): Promise<UserModel> {
		const profile = await this.userModel.findById(id).exec();
		if (!profile) {
			throw new UnauthorizedException(ERROR_MESSAGES.NOT_AUTHORIZATION);
		}
		return profile;
	}
}
