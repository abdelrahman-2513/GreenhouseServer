import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { IGProcess } from 'auth/interfaces';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('Navigation-queue') private readonly navigationQueue: Queue,
  ) {}

  async addToQueue(process: IGProcess) {
    await this.navigationQueue.add(process, { delay: 500 });
    console.log('Added to process Queue!');
  }
}
// import { InjectQueue } from '@nestjs/bull';
// import { Inject, Injectable, forwardRef } from '@nestjs/common';
// import { gettingUniqueId } from 'auth/config/get.unique.id';
// import { EPhase, EStatus } from 'auth/enum';
// import { IGProcess } from 'auth/interfaces';
// import { Job, Queue } from 'bull';

// import { UpdateProcessDTO } from 'process/dtos/update.process.dto';
// import { ProcessService } from 'process/process.service';

// @Injectable()
// export class QueueService {
//   constructor(
//     @InjectQueue('Navigation-queue') private readonly navigationQueue: Queue,
//     @InjectQueue('Mqtt-send-queue') private readonly mqttSendQueue: Queue,
//     @Inject(forwardRef(() => ProcessService))
//     private readonly processSVC: ProcessService,
//   ) {}

//   async addToQueue(process: IGProcess) {
//     await this.navigationQueue.empty();
//     await this.navigationQueue.add(process, { delay: 500 });
//     console.log('Added to process Queue!');
//   }

//   processQueue() {
//     this.navigationQueue.process(async (job) => {
//       console.log('Start processing job:', job.data);
//       const obj = { type: job.data.type, feild: job.data.feild };
//       const robot_id = job.data.robot_id;
//       const updatedData: UpdateProcessDTO = { status: EStatus['ON PROGRESS'] };

//       const updated = await this.processSVC.updateprocess(
//         job.data.id,
//         updatedData,
//       );
//       console.log(`Processing job with data: ${JSON.stringify(obj)}`);

//       const Routes = ['00F5', '20FR', '25FF', '26BB'];
//       await this.sendToMqtt(Routes, robot_id, obj.type);
//       console.log('All routes added to MQTT send queue');
//     });
//   }

//   async sendToMqtt(Route: string[], robot_id: string, process: EPhase) {
//     robot_id = gettingUniqueId(robot_id);

//     const MqttArray = this.FormulateData(Route, process, robot_id);
//     for (const route of MqttArray) {
//       await this.mqttSendQueue.add(route, { delay: 1000 }); // Add to MQTT send queue with 1-second delay
//     }
//     console.log('Added to MQTT send queue:', MqttArray);
//   }

//   FormulateData(Route: string[], process: EPhase, robot_id: string): string[] {
//     console.log('Formulating routes');
//     let MqttArray = [];
//     let type = 'X';
//     process === EPhase.SEEDING || process === EPhase.FERTILIZING
//       ? (type = 'N')
//       : (type = 'H');
//     Route.forEach((route, i) => {
//       const newRoute = `@${robot_id}${i}${type}${route}00;`;
//       MqttArray.unshift(newRoute);
//     });
//     console.log(MqttArray);
//     return MqttArray;
//   }

//   ProcessFinished(): void {
//     console.log('Process Finished');
//   }
// }
