import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './models/user.model';
import { UserDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { EMAIL_ERROR, PASSWORD_ERROR, REGISTER_ERROR } from '../messages/error.messages';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}
	public async createUser(dto: UserDto): Promise<UserModel> {
		const olduser = await this.userModel.findOne({ email: dto.email }).exec();
		if (olduser) {
			throw new BadRequestException(REGISTER_ERROR);
		}
		const passwordHash = await hash(dto.password, 12);
		const newUser = new this.userModel({ ...dto, password: passwordHash });
		return newUser.save();
	}
	public async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}
	public async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email);
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
