import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { ValidationPipe } from 'src/pipes/validator.pipe';

@Controller('users')
export class UsersController {
	constructor (private usersService : UsersService) {}

	@Get('/')
	async getAll() {
		return await this.usersService.findAll()
	}

	@UsePipes(ValidationPipe)
	@Post('/add')
	async create(
		@Body() userDto : CreateUserDto
	) {
		return (await this.usersService.create(userDto)).uuid
	}
}
