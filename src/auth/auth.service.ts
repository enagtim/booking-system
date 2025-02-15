import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { UserModel, UserDocument } from '../users/models/user.model';
import { ERROR_MESSAGES } from '../messages/error.messages';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}
	public async validateUser(email: string, password: string): Promise<UserModel> {
		const user = await this.userModel.findOne({ email }).exec();
		if (!user) {
			throw new UnauthorizedException(ERROR_MESSAGES.EMAIL_ERROR);
		}
		const isCorrectPassword = await compare(password, user.password);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(ERROR_MESSAGES.PASSWORD_ERROR);
		}
		return user;
	}
	public async login(user: UserModel): Promise<{ access_token: string }> {
		const payload = { email: user.email, role: user.role };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
