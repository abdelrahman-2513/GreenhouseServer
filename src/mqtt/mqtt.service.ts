// mqtt.service.ts

import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private client;

  // Connect to MQTT broker
  constructor() {
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
  }

  // Publish a message to a topic
  publish(topic: string, message: string) {
    this.client.publish(topic, message);
  }

  // Subscribe to a topic
  subscribe(topic: string, callback: (message: number) => void) {
    this.client.subscribe(topic);
    this.client.on('message', (topic, message) => {
      callback(message.toString());
    });
  }
}
