import { Controller, Get, Post, Body, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validator.pipe';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat-dto';
import { GetByUserUuidDto } from './dto/get-by-user-uuid-dto';

@Controller('chats')
export class ChatsController {
	constructor(private chatService : ChatsService) {}

	@Get('/')
	async getAll() {
		return await this.chatService.findAll()
	}

	@UsePipes(ValidationPipe)
	@Post('/add')
	async create(
		@Body() chatDto : CreateChatDto
	) {
		return (await this.chatService.create(chatDto)).uuid
	}

	@UsePipes(ValidationPipe)
	@Post('/get')
	async findByUserUuid(
		@Body() chatDto : GetByUserUuidDto
	) {
		return await this.chatService.findByUserUuid(chatDto.user)
	}
}
