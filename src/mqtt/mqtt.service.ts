// mqtt.service.ts

import { Injectable } from '@nestjs/common';
import { EEmpType } from 'auth/enum';
import { IEmpMessage } from 'auth/interfaces';
import * as mqtt from 'mqtt';
import { ProcessService } from 'process/process.service';
import { RobotService } from 'robot/robot.service';

@Injectable()
export class MqttService {
  private client;

  // Connect to MQTT broker
  constructor(
    private readonly robotSVC: RobotService,
    private readonly processSVC: ProcessService,
  ) {
    // Connect to MQTT broker
    this.client = mqtt.connect('mqtt://b37.mqtt.one:1883', {
      username: '18ciqt4398',
      password: '259bhmopuv',
    });
    // Handle connection events
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (err) => {
      console.error('MQTT error:', err);
    });
    // this.client.on('message', (topic, message) => {
    //   console.log(message);
    //   // callback(message.toString());
    //   if (topic === '18ciqt4398/robotAi') {
    //     const data: IEmpMessage = JSON.parse(message.toString());
    //     console.log(data);
    //   } else {
    //     console.log(message);
    //   }
    // });
  }

  // Publish a message to a topic
  publish(topic: string, message: string) {
    this.client.publish(topic, message);
  }

  // Subscribe to a topic
  subscribe(topic: string) {
    this.client.subscribe(topic);
    this.client.on('message', async (topic, message) => {
      // console.log(message);
      // callback(message.toString());
      if (topic === '18ciqt4398/robotAi') {
        const data: IEmpMessage = JSON.parse(message.toString());
        if (data.type === EEmpType.Ack) {
          console.log(data.robotId);
          const process = await this.processSVC.updateProcessStatus(
            data.robotId,
          );
          console.log(process);
          const robot = await this.robotSVC.updateRobotStatus(data.robotId);
          console.log(robot);
        }
        console.log(data);
      } else {
        console.log(message);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify content type as JSON
          },
          body: JSON.stringify(message), // Convert data to JSON string
        };

        // Make the POST request
        fetch(
          'https://error-recovery-6054fc82277f.herokuapp.com/Error_recovery',
          options,
        )
          .then((response) => {
            console.log(response);
            if (response.ok) {
              return response.json(); // Parse the JSON in the response
            }
            throw new Error('Network response was not ok.');
          })
          .then((data) => {
            console.log(data); // Handle the response data
            this.publish('18ciqt4398/robot', `${data}`);
          });
      }
    });
  }
}
