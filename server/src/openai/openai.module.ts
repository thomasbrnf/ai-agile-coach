import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { OpenAiService } from './openai.service';

@Module({
  imports: [MessagesModule],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
