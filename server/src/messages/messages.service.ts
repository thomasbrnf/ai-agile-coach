import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import OpenAI from 'openai';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createUserMessage(messageData: string) {
    const data = {
      role: 'user',
      content: messageData,
    };

    const message = this.messageRepository.create(data);

    return await this.messageRepository.save(message);
  }

  async createAssistantMessage(
    response: OpenAI.Chat.Completions.ChatCompletionMessage,
  ) {
    const message = this.messageRepository.create(response);
    return await this.messageRepository.save(message);
  }

  async findAll() {
    return await this.messageRepository.find();
  }
}
