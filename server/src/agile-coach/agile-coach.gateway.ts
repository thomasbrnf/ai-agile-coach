import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { OpenAiService } from 'src/openai/openai.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AgileCoachGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly openaiService: OpenAiService,
  ) {}

  @SubscribeMessage('request')
  async handleRequest(@MessageBody() messageData: string) {
    const userMessage =
      await this.messagesService.createUserMessage(messageData);

    this.server.emit('message', userMessage);

    this.server.emit('pending');
    const aiResponse = await this.openaiService.getResponse();
    this.server.emit('received');

    this.server.emit('message', aiResponse);

    return userMessage;
  }
}
