import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  // port: 5000,
})
export class WebSocketService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger = new Logger('ChatGateway');
  handleConnection(client: Socket) {
    console.log(`The cliend of id : ${client.id} connected successfuly`);
  }
  handleDisconnect(client: Socket) {
    console.log(`The client of id : ${client.id} disconnected`);
  }
  @SubscribeMessage('led')
  async handleEvent(
    @MessageBody()
    payload: any,
  ): Promise<any> {
    this.logger.log(payload);
    console.log(payload);
    this.server.emit('led', payload);
    return payload;
  }
}
