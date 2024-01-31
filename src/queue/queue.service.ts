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
    await this.navigationQueue.empty();
    await this.navigationQueue.add(process);
    console.log('Added to process Queue!');
  }
}
