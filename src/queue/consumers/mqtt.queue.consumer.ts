// mqtt-send.processor.ts

import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { MqttService } from 'mqtt/mqtt.service';

@Processor('Mqtt-send-queue')
export class MqttSendProcessor {
  constructor(private readonly mqttService: MqttService) {}

  @Process()
  handleMqttJob(job) {
    console.log(`Processing job from MQTT send queue: ${job.data}`);
    // Publish the data to the MQTT topic
    this.mqttService.publish('your-mqtt-topic', job.data);
    console.log('Publishing done');
  }
  @OnQueueCompleted()
  ProcessDone(): void {
    console.log('Process Finished');
  }
  @OnQueueActive()
  processActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  @OnQueueError()
  ProcessError(err: Error) {
    console.log(`Error on job ${err}...`);
  }
  @OnQueueProgress()
  processProgress(job: Job, progress: number) {
    console.log(
      `Progressing on job ${job.id} of type ${job.name} with data ${job.data} and number ${progress}...`,
    );
  }
}
