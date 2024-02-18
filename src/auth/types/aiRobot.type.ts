import { gettingUniqueId } from 'auth/config/get.unique.id';
import { IRobotAI } from 'auth/interfaces';

export class AIRobot implements IRobotAI {
  robotId?: string;
  greenhouseId?: string;
  constructor(robot: IRobotAI) {
    this.robotId = gettingUniqueId(robot.robotId);
    this.greenhouseId = robot.greenhouseId;
  }
}
