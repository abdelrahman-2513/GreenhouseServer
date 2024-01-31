// mqtt-send.processor.ts

// import {
//   OnQueueActive,
//   OnQueueCompleted,
//   OnQueueError,
//   OnQueueProgress,
//   Process,
//   Processor,
// } from '@nestjs/bull';
// import { Job } from 'bull';
// import { MqttService } from 'mqtt/mqtt.service';

// @Processor('Mqtt-send-queue')
// export class MqttSendProcessor {
//   constructor(private readonly mqttService: MqttService) {}

//   @Process()
//   handleMqttJob(job) {
//     console.log(`Processing job from MQTT send queue: ${job.data}`);
//     // Publish the data to the MQTT topic
//     this.mqttService.publish('your-mqtt-topic', job.data);
//     console.log('Publishing done');
//   }
//   @OnQueueCompleted()
//   ProcessDone(): void {
//     console.log('Process Finished');
//   }
//   @OnQueueActive()
//   processActive(job: Job) {
//     console.log(
//       `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
//     );
//   }
//   @OnQueueError()
//   ProcessError(err: Error) {
//     console.log(`Error on job ${err}...`);
//   }
//   @OnQueueProgress()
//   processProgress(job: Job, progress: number) {
//     console.log(
//       `Progressing on job ${job.id} of type ${job.name} with data ${job.data} and number ${progress}...`,
//     );
//   }
// }
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  OnQueueStalled,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { MqttService } from 'mqtt/mqtt.service';
import { stringify } from 'querystring';

@Processor('Mqtt-send-queue')
export class MqttSendProcessor {
  constructor(private readonly mqttService: MqttService) {}

  @Process()
  handleMqttJob(job: Job) {
    console.log(`Processing job from MQTT send queue: ${stringify(job.data)}`);
    try {
      // Publish the data to the MQTT topic
      this.mqttService.publish('18ciqt4398/robot', job.data.route);
      console.log('Publishing done');
    } catch (error) {
      console.error('Error publishing to MQTT:', error);
      throw error; // Re-throw the error to mark the job as failed
    }
  }

  @OnQueueCompleted()
  processCompleted(job: Job) {
    console.log(`Job ${job.id} has been completed!`);
  }

  @OnQueueActive()
  processActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueError()
  processError(error: Error) {
    console.error('Error processing job:', error);
  }

  @OnQueueProgress()
  processProgress(job: Job, progress: number) {
    console.log(
      `Progressing on job ${job.id} of type ${job.name} with data ${job.data} and number ${progress}...`,
    );
  }
  @OnQueueStalled()
  async handleStalledJob(job: Job) {
    console.log(`Job ${job.id} stalled. Retrying MQTT publish...`);
    await this.retryMqttPublish(job);
  }

  private async retryMqttPublish(job: Job) {
    // Retry logic for MQTT publish
    // You may choose to directly re-add the job to the queue
    await job.retry();
  }
}
