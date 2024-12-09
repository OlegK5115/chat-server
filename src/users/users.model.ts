import { Model, Table, Column, DataType, BelongsToMany, HasMany} from "sequelize-typescript";
import { ChatsUsers } from "src/chats/chats-users.model";
import { Chats } from "src/chats/chats.model";
import { Messages } from "src/messages/messages.model";

interface UsersCreationAttrs {
	uuid : string,
	username : string
}

@Table({tableName : 'users', updatedAt : false})
export class Users extends Model<Users, UsersCreationAttrs> {
	@Column({type: DataType.STRING, unique : true, allowNull: false, primaryKey: true})
	uuid: string

	@Column({type: DataType.STRING, allowNull: false})
	username : string

	@HasMany(() => Messages)
	messages : Messages[]

	@BelongsToMany(() => Chats, () => ChatsUsers)
	chats : Chats[]
}