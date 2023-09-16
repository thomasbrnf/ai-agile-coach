import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io'; 


@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessagesGateway {

  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('message') 
  async sendMessage(@MessageBody() messageData: string) {
    const message = await this.messagesService.createUserMessage(messageData);

    this.server.emit('message', message);

    await this.messagesService.getAiModelAnswer()
    .then(response => console.log(response))
    .catch(error => console.log(error));

    
    return message;
  }

  @SubscribeMessage('assistantResponse')
  async assistantReponse(){
  }

  @SubscribeMessage('allMessages')
  findAll() {

    return this.messagesService.findAll();
  }

}
