import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { OpenAiModule } from 'src/openai/openai.module';
import { AgileCoachGateway } from './agile-coach.gateway';

@Module({
  imports: [MessagesModule, OpenAiModule],
  providers: [AgileCoachGateway],
})
export class AgileCoachModule {}
