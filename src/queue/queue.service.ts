import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EStatus } from 'auth/enum';
import { IGProcess } from 'auth/interfaces';
import { Queue } from 'bull';
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
    console.log(await this.queue.count());
  }
  processQueue(): void {
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
    });
  }
}
