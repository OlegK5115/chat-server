import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { CHAT_TABLE, CHAT_USER_TABLE } from 'src/constans';
import { Chats } from './chats.model';
import { ChatsUsers } from './chats-users.model';
import { UsersModule } from 'src/users/users.module';

const chatsProv = {
  provide : CHAT_TABLE,
  useValue : Chats
}

const chatsusersProv = {
  provide : CHAT_USER_TABLE,
  useValue : ChatsUsers
}

@Module({
  imports : [UsersModule],
  providers: [ChatsService, chatsProv, chatsusersProv],
  controllers: [ChatsController],
  exports : [ChatsService]
})
export class ChatsModule {}
