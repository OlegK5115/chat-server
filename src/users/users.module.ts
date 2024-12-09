import { Module } from '@nestjs/common';
import { USER_TABLE } from 'src/constans';
import { Users } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const usersProv = {
	provide : USER_TABLE,
	useValue : Users
}

@Module({
	providers : [UsersService, usersProv],
	controllers : [UsersController],
	exports : [UsersService]
})
export class UsersModule {}
