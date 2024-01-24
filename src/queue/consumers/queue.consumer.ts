import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('Navigation-queue')
export class ProcessConsumer {
  @OnQueueCompleted()
  ProcessFinished(): void {
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
