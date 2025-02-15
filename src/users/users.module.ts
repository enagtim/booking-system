import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserModelSchema } from './models/user.model';
import { UsersController } from './users.controller';

@Module({
	imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserModelSchema }])],
	providers: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
