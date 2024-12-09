import { Module } from '@nestjs/common';
import * as config from 'config'
import { Sequelize } from 'sequelize-typescript';
import { ChatsUsers } from 'src/chats/chats-users.model';
import { Chats } from 'src/chats/chats.model';
import { DB_SEQUELIZE } from 'src/constans';
import { Messages } from 'src/messages/messages.model';
import { Users } from 'src/users/users.model';


const sequelize = {
	provide : DB_SEQUELIZE,
	useFactory : async () => {
		const sequelize = new Sequelize({
			dialect: config.db_dialect,
        	host: config.postgres.host,
        	port: config.postgres.port,
        	username: config.postgres.username,
        	password: config.postgres.password,
        	database: config.postgres.database
		})
		
		sequelize.addModels([ Users, Chats, ChatsUsers, Messages ])

		await sequelize.sync()

		return sequelize
	}
}

@Module({
	providers : [sequelize]
})
export class DbModule {}