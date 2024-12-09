import { Injectable, Inject } from '@nestjs/common';
import { CHAT_TABLE, CHAT_USER_TABLE } from 'src/constans';
import { Chats, ChatsCreationAttrs } from './chats.model';
import { ChatsUsers } from './chats-users.model';
import { CreateChatDto } from './dto/create-chat-dto';
import {v4 as uuid} from 'uuid'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatsService {
	constructor(
		@Inject(CHAT_TABLE) private chatsRep : typeof Chats,
		@Inject(CHAT_USER_TABLE) private chatsUsersRep : typeof ChatsUsers,
		private usersService : UsersService
	) {}

	async create(dto : CreateChatDto) {
		const params : ChatsCreationAttrs = {
			uuid : uuid(),
			name : dto.name
		}
		const ans = await this.chatsRep.create(params)

		dto.users.forEach(async (user_uuid) => {
			const user = this.usersService.findByUuid(user_uuid)
			if (user) {
				await this.chatsUsersRep.create({
					chat_uuid : params.uuid,
					user_uuid : user_uuid
				})
			}
		})

		return ans
	}

	async findAll() {
		return await this.chatsRep.findAll()
	}

	async findByUuid(chat_uuid : string) {
		return await this.chatsRep.findOne({
			where : {
				uuid : chat_uuid
			}
		})
	}

	async findByUserUuid(uuid : string) {
		const chat_nodes = await this.chatsUsersRep.findAll({
			order : [
				['createdAt', 'DESC']
			],
			where : { user_uuid : uuid }
		})

		const ans = await Promise.all(chat_nodes.map(async (chat_node) => {
			const chat_uuid = chat_node.dataValues.chat_uuid
			const ans = await this.chatsRep.findOne({
				where : { uuid : chat_uuid }
			})

			return ans.dataValues
		}))

		return ans
	}
}