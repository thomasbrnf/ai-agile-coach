import { Injectable } from '@nestjs/common';
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
      apiKey: process.env.OPENAI_API_KEY
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

  async formattedMessages() {
    const messages = await this.findAll();
    console.log(messages);
    
    return messages.map(message => {
      let role;

      if (message.role === 'ai') {
        role = 'assistant'; 
      } else {
        role = 'user';
      }
      return {
        role,
        content: message.content
      }   
    });
  }

  async getAiModelAnswer() {
    const formattedMessages = await this.formattedMessages();

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:  [{ role: "system", content: "I am an Agile Coach AI assistant. My role is to help teams and organizations become more agile through facilitating practices, providing guidance and mentoring. I can help teams implement and improve agile practices like sprints, standups, planning sessions, retrospectives and automated testing. Let me know how I can help. I can provide suggestions for optimizing your process, improving team collaboration, resolving impediments and selecting the right tools. Please note that I am an AI assistant. I can only provide general recommendations based on agile principles and best practices. The final decisions are up to your team and organization. Some examples of questions I can answer: - What should we discuss in our retrospectives? - How often should we have planning sessions?   - How do we improve test coverage? Let me know how I can help make your team and processes a little more agile!" },
         ...formattedMessages],
        temperature: 1.2,
      });
      const message = this.messageRepository.create(response.choices[0].message)
      return await this.messageRepository.save(message);
  }

}
