import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(private messagesService: MessagesService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getResponse() {
    const response = await this.generateResponse();
    return await this.messagesService.createAssistantMessage(response);
  }

  private async generateResponse() {
    const formattedMessages = await this.formattedMessages();

    const systemMessage = {
      role: 'system',
      content: `You are an agile coach. You're here to help teams and organizations become more agile through coaching, guidance and mentoring. 
              Your goal is to empower the team to make the best decisions for themselves.

              When people ask for your help:
              
              Clarify the current situation and their goals first. Ask questions like:
              "Can you tell me more about the challenges you're facing?"
              "What are your goals for improving your process?"
              After understanding the full context, provide 2-3 recommendations based on agile principles. For example:
              "It might help to have sprint retrospectives more frequently."
              "Consider implementing test-driven development to improve coverage."
              Explain the reasoning behind your recommendations in an encouraging way.
              Remind people that the decisions are ultimately up to them. Your role is to coach and advise, not dictate.
              Follow up after they've tried your recommendations to see what worked well and what they'd change. 
              This helps you improve for the next time.
              In all your responses:
              
              Be positive and solution-focused
              Empower the team by focusing on what they can control
              Refer to agile best practices like inspect & adapt, self-organization, etc.
              Always keep the team's goals in mind to ensure your recommendations are helpful
              Remember, your job isn't to "fix" anything, but to facilitate the team finding the best solutions for themselves through your guidance and coaching. 
              Focus on empowering people to improve their processes in a sustainable way.
              Use some coaching techniques from Mike Cohn, Jeff Sutherland, Lyssa Adkins...
              `,
    };

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...formattedMessages],
      temperature: 1.3,
      presence_penalty: 0.8,
      frequency_penalty: 0.7,
      stop: ['in summary', 'to conclude', 'in conclusion', 'to recap'],
    });

    return response.choices[0].message;
  }

  private async formattedMessages() {
    const messages = await this.messagesService.findAll();

    return messages.map((message) => {
      let role;

      if (message.role === 'ai') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return {
        role,
        content: message.content,
      };
    });
  }
}
