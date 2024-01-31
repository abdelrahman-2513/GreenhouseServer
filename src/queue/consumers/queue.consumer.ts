import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Inject, forwardRef } from '@nestjs/common';
import { gettingUniqueId } from 'auth/config/get.unique.id';
import { EPhase, EStatus } from 'auth/enum';
import { Job, Queue } from 'bull';
import { MqttService } from 'mqtt/mqtt.service';
import { UpdateProcessDTO } from 'process/dtos/update.process.dto';
import { ProcessService } from 'process/process.service';

@Processor('Navigation-queue')
export class ProcessConsumer {
  constructor(
    @InjectQueue('Mqtt-send-queue') private readonly mqttSendQueue: Queue,
    @Inject(forwardRef(() => ProcessService))
    private readonly processSVC: ProcessService,
    private mqttService: MqttService,
  ) {}

  @Process()
  async handleProcessCreation(job) {
    console.log('Start processing job:', job.data);
    const obj = { type: job.data.type, feild: job.data.feild };
    const robot_id = job.data.robot_id;
    const updatedData: UpdateProcessDTO = { status: EStatus['ON PROGRESS'] };

    const updated = await this.processSVC.updateprocess(
      job.data.id,
      updatedData,
    );
    console.log(`Processing job with data: ${JSON.stringify(obj)}`);

    const Routes = ['00F5', '20FR', '25FF', '26BB'];
    await this.sendToMqtt(Routes, robot_id, obj.type);
    console.log('All routes added to MQTT send queue');
  }

  async sendToMqtt(Route: string[], robot_id: string, process: EPhase) {
    robot_id = gettingUniqueId(robot_id);

    const MqttArray = this.FormulateData(Route, process, robot_id);
    console.log('MqttArray:', MqttArray); // Log MqttArray contents for debugging
    await this.sendToEmpedded(MqttArray);
    console.log('Added to MQTT send queue:', MqttArray);
  }

  FormulateData(Route: string[], process: EPhase, robot_id: string): string[] {
    console.log('Formulating routes');
    let MqttArray = [];
    let type = 'X';
    process === EPhase.SEEDING || process === EPhase.FERTILIZING
      ? (type = 'N')
      : (type = 'H');
    Route.forEach((route, i) => {
      const newRoute = `@${robot_id}${i}${type}${route}00;`;
      MqttArray.unshift(newRoute);
    });
    console.log(MqttArray);
    return MqttArray;
  }

  async sendToEmpedded(MqttArray: string[]): Promise<void> {
    for (const route of MqttArray) {
      console.log('Adding route to MQTT send queue:', route); // Log each route being added to the queue
      await this.delay(500);
      this.mqttService.publish('18ciqt4398/robot', route);
    }
  }
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  ProcessFinished(): void {
    console.log('Process Finished');
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
