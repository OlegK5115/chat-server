import { Injectable, Inject } from '@nestjs/common';
import { MESSAGE_TABLE } from 'src/constans';
import { Messages } from './messages.model';
import {v4 as uuid} from 'uuid'
import { CreateMessageDto } from './dto/create-message-dto';
import { UsersService } from 'src/users/users.service';
import { ChatsService } from 'src/chats/chats.service';
import { ServiceException } from 'src/exceptions/service.exception';

@Injectable()
export class MessagesService {
	constructor(
		@Inject(MESSAGE_TABLE) private messagesRep : typeof Messages,
		private usersService : UsersService,
		private chatsService : ChatsService
	) {}

	async create(dto : CreateMessageDto) {
		const user = await this.usersService.findByUuid(dto.author_uuid)
		if (!user) {
			throw new ServiceException("wrong author uuid")
		}

		const chat = await this.chatsService.findByUuid(dto.chat_uuid)
		if (!chat) {
			throw new ServiceException("wrong chat uuid")
		}

		const ans = await this.messagesRep.create({
			uuid : uuid(),
			chat_uuid : dto.chat_uuid,
			author_uuid : dto.author_uuid,
			text : dto.text
		})

		return ans
	}

	async findAll() {
		return await this.messagesRep.findAll()
	}

	async findByChatUuid(uuid : string) {
		return await this.messagesRep.findAll({
			order : [
				['createdAt', 'DESC']
			],
			where : {
				chat_uuid : uuid
			}
		})
	}
}
