import { Injectable, Inject } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import OpenAI from 'openai';


@Injectable()
export class MessagesService {
  openai: OpenAI;
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) { 
    this.openai = new OpenAI({
      apiKey: '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'
    });
  }

  async createUserMessage(messageData: string) {
    const data =  {
      role: 'user',
      content: messageData
    }

    const message = this.messageRepository.create(data)

    return await this.messageRepository.save(message);
  }

  async createAssistantMessage(response: string) {
    const data =  {
      role: 'assistant',
      content: response
    }

    const message = this.messageRepository.create(data)
    return await this.messageRepository.save(message);
  }

  async findAll() {
    return await this.messageRepository.find();
  }
  async messages() {
    const messages = await this.findAll();
    return messages.map(message => {
      return {
        role: message.role,
        content: message.content
      }   
    });
  }

  async getAiModelAnswer() {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Hello!"}],
      });
      console.log(response.choices[0].message);

      return response;   

  }

}
