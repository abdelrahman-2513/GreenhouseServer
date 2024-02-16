import { EEmpType } from 'auth/enum';

// /robotAI tobic data

export interface IEmpMessage {
  robotId?: string;
  type?: EEmpType;
  msg?: string;
}
