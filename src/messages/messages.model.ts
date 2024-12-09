import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Chats } from "src/chats/chats.model";
import { Users } from "src/users/users.model";

interface MessagesCreationAttrs {
	uuid: string
	chat_uuid: string
	author_uuid: string
	text: string
}

@Table({tableName : 'messages', updatedAt : false})
export class Messages extends Model<Messages, MessagesCreationAttrs> {
	@Column({type: DataType.STRING, unique: true, allowNull: false, primaryKey: true})
	uuid: number

	@ForeignKey(() => Chats)
	@Column({type: DataType.STRING, allowNull: false})
	chat_uuid: string

	@ForeignKey(() => Users)
	@Column({type: DataType.STRING, allowNull: false})
	author_uuid: string

	@Column({type: DataType.STRING, allowNull: false})
	text: string

	@BelongsTo(() => Chats)
	chat : Chats

	@BelongsTo(() => Users)
	user : Users
}