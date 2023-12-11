import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/auth/decorators';
import { MqttService } from 'src/mqtt/mqtt.service';

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
