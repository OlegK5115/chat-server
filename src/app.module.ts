import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, DbModule, ChatsModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
