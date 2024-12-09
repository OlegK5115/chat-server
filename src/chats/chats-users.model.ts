import { Model, Table, Column, DataType, ForeignKey} from "sequelize-typescript";
import { Chats } from "./chats.model";
import { Users } from "src/users/users.model";

interface ChatsUsersCreationAttrs {
	user_uuid: string,
	chat_uuid : string
}

@Table({tableName : 'chats_users', updatedAt : false})
export class ChatsUsers extends Model<ChatsUsers, ChatsUsersCreationAttrs> {
	@ForeignKey(() => Chats)
	@Column({type: DataType.STRING, unique : true, allowNull: false})
	chat_uuid: string

	@ForeignKey(() => Users)
	@Column({type: DataType.STRING, allowNull: false})
	user_uuid : string
}