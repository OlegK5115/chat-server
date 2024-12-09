import { Controller, Get, Post, Body, UsePipes} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validator.pipe';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message-dto';
import { GetByChatUuidDto } from './dto/get-by-chat-uuid-dto';

@Controller('messages')
export class MessagesController {
	constructor(private messagesService : MessagesService) {}
	
	@Get('/')
	async getAll() {
		return await this.messagesService.findAll()
	}

	@UsePipes(ValidationPipe)
	@Post('/add')
	async create(
		@Body() messageDto : CreateMessageDto
	) {
		return (await this.messagesService.create(messageDto)).uuid
	}

	@UsePipes(ValidationPipe)
	@Post('/get')
	async getByChatUuid(
		@Body() messageDto : GetByChatUuidDto
	) {
		return await this.messagesService.findByChatUuid(messageDto.chat)
	}
}
