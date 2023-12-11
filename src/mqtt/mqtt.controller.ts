// your.controller.ts

import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { headerIncereptor } from 'incerptors/headers.increptors';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Get('on')
  @UseInterceptors(headerIncereptor)
  async sendMessage() {
    // Publish a message to a topic
    console.log('from mqtt messaging');
    this.mqttService.publish('18ciqt4398/', '1');
    return 'Message sent';
  }
  @Get('off')
  // @UseInterceptors(headerIncereptor)
  async sendOffMessage() {
    // Publish a message to a topic
    console.log('from mqtt messaging');
    this.mqttService.publish('18ciqt4398/', '0');
    return 'Message sent';
  }
}
