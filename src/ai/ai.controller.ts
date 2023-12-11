import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Public } from 'auth/decorators';
import { Response } from 'express';
import { MqttService } from 'mqtt/mqtt.service';


@Controller('ai')
export class AiController {
  constructor(private MQTTSVC: MqttService) {}

  @Public()
  @Post('/Navigate')
  aiNavigation(@Res() res: Response, @Body() navigationBody: any) {
    this.MQTTSVC.publish(
      '18ciqt4398/navigation',
      JSON.stringify(navigationBody),
    );
    res.status(201).send('Data sent to ESP successfully!');
  }
}
