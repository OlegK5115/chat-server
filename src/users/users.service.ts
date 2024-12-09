import { Injectable, Inject } from '@nestjs/common';
import { USER_TABLE } from 'src/constans';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user-dto';
import {v4 as uuid} from 'uuid'

@Injectable()
export class UsersService {
	constructor(@Inject(USER_TABLE) private usersRep : typeof Users) {}

	async create(dto : CreateUserDto) {
		const ans = await this.usersRep.create({
			uuid : uuid(),
			username : dto.username
		})

		return ans
	}

	async findByUuid(uuid : string) {
		return await this.usersRep.findOne({
			where : {
				uuid : uuid
			}
		})
	}

	async findAll() {
		return await this.usersRep.findAll()
	}

	async clearAll() {
		return await this.usersRep.destroy()
	}
}
