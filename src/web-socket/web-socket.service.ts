import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import * as mqtt from 'mqtt';
import { IWRobot } from './interface/websocket.robot.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  // port: 5000,
})
export class WebSocketService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private mqttClient: mqtt.MqttClient;
  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');

    // Connect to MQTT broker
    this.mqttClient = mqtt.connect('mqtt://b37.mqtt.one:1883', {
      username: '18ciqt4398',
      password: '259bhmopuv',
    });

    // Handle connection events
    this.mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    //Handle error events
    this.mqttClient.on('error', (err) => {
      console.error('MQTT error:', err);
    });

    // Handle massage reciving
    this.mqttClient.on('message', (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log(data);
        // check if the topic is greenhouse!
        if (topic === `18ciqt4398/greenhouse`) {
          console.log(data);
          this.server
            .to(`greenhouse-data-${data.greenhouseId}`)
            .emit('realtime-greenhouse-data', data);
          console.log('sent to channel!');
        }
        // check if topic is robot and want to send streaming data
        if (topic === `18ciqt4398/robotWeb`) {
          console.log(data);
          this.server
            .to(`robot-data-${data.robotId}`)
            .emit('realtime-streaming-data', data);
          console.log('sent to channel!');
        }
      } catch (error) {
        console.error('Error parsing MQTT message:', error);
        console.error('Message content:', message.toString());
      }
    });
  }
  handleConnection(client: Socket) {
    console.log(`The cliend of id : ${client.id} connected successfuly`);
  }
  handleDisconnect(client: Socket) {
    console.log(`The client of id : ${client.id} disconnected`);
  }
  // @SubscribeMessage('led')
  // async handleEvent(
  //   @MessageBody()
  //   payload: any,
  // ): Promise<any> {
  //   console.log(payload);
  //   this.server.emit('led', payload);
  //   return payload;
  // }

  // subscribe the channel of the greenhouse to get real time data
  @SubscribeMessage('subscribe-to-greenhouse')
  subscribeToGreenhouse(
    @MessageBody() greenhouseId: string,
    @ConnectedSocket() client: Socket, // Ensure the correct decorator is used
  ): void {
    if (!client) {
      // Handle the case where the client is not defined.
      console.error('Client is not defined.');
      return;
    }

    // joining channel with the 6 charchters from the id of the greenhouse
    const extractedSubstring = this.gettingUniqueId(greenhouseId);
    const channel = `greenhouse-data-${extractedSubstring}`;
    client.join(channel);
    console.log(`Client ${client.id} subscribed to ${channel}`);

    // Subscribe to the corresponding MQTT topic
    // this.mqttClient.subscribe(`18ciqt4398/greenhouse/${greenhouseId}`);
    this.mqttClient.subscribe(`18ciqt4398/greenhouse`);
  }
  @SubscribeMessage('subscribe-to-robot')
  subscribeToRobotStreaming(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket, // Ensure the correct decorator is used
  ): void {
    if (!client) {
      // Handle the case where the client is not defined.
      console.error('Client is not defined.');
      return;
    }
    try {
      console.log(message);
      const data: IWRobot = JSON.parse(message);

      // joining channel with the 6 charchters from the id of the greenhouse
      const extractedSubstring = this.gettingUniqueId(data.robotId);
      const channel = `robot-data-${extractedSubstring}`;
      client.join(channel);
      console.log(`Client ${client.id} subscribed to ${channel}`);

      // Subscribe to the corresponding MQTT topic
      // this.mqttClient.subscribe(`18ciqt4398/greenhouse/${greenhouseId}`);
      this.mqttClient.publish(
        `18ciqt4398/robot`,
        `@${extractedSubstring}0A${data.message}00;`,
      );
      data.message === 'STST' &&
        this.mqttClient.subscribe(`18ciqt4398/robotWeb`);
    } catch (err) {
      console.log(err);
    }
  }
  @SubscribeMessage('Monitor-robot')
  subscribeToRobot(@MessageBody() message: IWRobot, client: any) {
    console.log(message);
    message = JSON.parse(message.toString());
    console.log(message);
    const extractedSubstring = this.gettingUniqueId(message.robotId);
    message.robotId = extractedSubstring;
    const MqttMessage = this.CreateDataFormat(message);
    this.mqttClient.publish(`18ciqt4398/robot`, MqttMessage);
  }

  private CreateDataFormat(message: IWRobot): string {
    const MqttMessage = `@${message.robotId}0C${message.message}00;`;
    return MqttMessage;
  }
  private gettingUniqueId(id: string): string {
    const substringLength = 6;
    const startIndex = Math.max(
      0,
      Math.floor((id.length - substringLength) / 2),
    );
    const extractedSubstring = id.substring(
      startIndex,
      startIndex + substringLength,
    );
    return extractedSubstring;
  }
}
