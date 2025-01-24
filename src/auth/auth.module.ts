import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './models/user.model';

@Module({
	imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserModelSchema }])],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
