import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
} from '@nestjs/bull';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EStatus } from 'auth/enum';
import { IGProcess } from 'auth/interfaces';
import { Job, Queue } from 'bull';
import { UpdateProcessDTO } from 'process/dtos/update.process.dto';
import { ProcessService } from 'process/process.service';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('Navigation-queue') private readonly queue: Queue,
    @Inject(forwardRef(() => ProcessService))
    private processSVC: ProcessService,
  ) {}
  async addToQueue(process: IGProcess) {
    await this.queue.add(process, { delay: 1000 });
  }

  // Processing data deliveered to queue
  processQueue(): void {
    // console.log(this.queue.count());
    this.queue.process(async (job) => {
      console.log(job);

      // Recobnstructing The object that to be send to AI Model
      const obj = { type: job.data.type, feild: job.data.feild };

      // Creating Updating object to update status when go to processing
      const updatedData: UpdateProcessDTO = { status: EStatus['ON PROGRESS'] };

      // Update data base object
      const updated = await this.processSVC.updateprocess(
        job.data.id,
        updatedData,
      );
      console.log(`Processing job with data: ${JSON.stringify(obj)}`);

      // after finishing process
      this.ProcessFinished();
    });
  }
  ProcessFinished(): void {
    console.log('Process Finished');
  }
}
