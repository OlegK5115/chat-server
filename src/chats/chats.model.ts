import { Model, Table, Column, DataType, BelongsToMany, HasMany} from "sequelize-typescript";
import { Users } from "src/users/users.model";
import { ChatsUsers } from "./chats-users.model";
import { Messages } from "src/messages/messages.model";

export interface ChatsCreationAttrs {
	uuid: string,
	name : string
}

@Table({tableName : 'chats', updatedAt : false})
export class Chats extends Model<Chats, ChatsCreationAttrs> {
	@Column({type: DataType.STRING, unique : true, allowNull: false, primaryKey: true})
	uuid: string

	@Column({type: DataType.STRING, allowNull: false})
	name : string

	@HasMany(() => Messages)
	messages : Messages[]

	@BelongsToMany(() => Users, () => ChatsUsers)
	users : Users[]
}