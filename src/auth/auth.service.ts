import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import { EMAIL_ERROR, PASSWORD_ERROR } from '../messages/error.messages';
import { UserModel, UserDocument } from '../users/models/user.model';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}
	public async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const user = await this.userModel.findOne({ email }).exec();
		if (!user) {
			throw new UnauthorizedException(EMAIL_ERROR);
		}
		const isCorrectPassword = await compare(password, user.password);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(PASSWORD_ERROR);
		}
		return { email: user.email };
	}
	public async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
