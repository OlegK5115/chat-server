import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MESSAGE_TABLE } from 'src/constans';
import { Messages } from './messages.model';
import { UsersModule } from 'src/users/users.module';
import { ChatsModule } from 'src/chats/chats.module';

const messageProv = {
	provide : MESSAGE_TABLE,
	useValue : Messages
}

@Module({
	imports : [UsersModule, ChatsModule],
	providers: [MessagesService, messageProv],
	controllers: [MessagesController]
})
export class MessagesModule {}
