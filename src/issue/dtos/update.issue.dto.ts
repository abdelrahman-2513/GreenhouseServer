import { EIStatus } from 'auth/enum';

export class UpdateIssueDTO {
  creator?: string;
  greenhouse?: string;
  robot?: string;
  technician?: string;
  description?: String;
  title?: string;
  resolvedAt?: Date;
  status?: EIStatus;
}
