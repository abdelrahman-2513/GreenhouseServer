import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as cors from 'cors';
import { WebSocketModule } from './web-socket/web-socket.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { RobotModule } from './robot/robot.module';
import { GreenhouseController } from './greenhouse/greenhouse.controller';
import { GreenhouseModule } from './greenhouse/greenhouse.module';
import { ProductModule } from './product/product.module';
import { AiModule } from './ai/ai.module';
import { IsUniqueEmailConstraints } from 'user/validators/isUniqueEmail.validator';
import { IsUniqueNameConstraints } from 'robot/validators/isuniquerobotname.validator';
// import { IsUniqueEmailConstraint } from 'user/validators/unique-emqil.validator';
import { ProcessModule } from './process/process.module';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from 'queue/queue.module';
import { ProcessConsumer } from 'queue/consumers/queue.consumer';
import { MqttService } from 'mqtt/mqtt.service';
import { MqttSendProcessor } from 'queue/consumers/mqtt.queue.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    BullModule.forRootAsync({
      useFactory: () => require('./auth/config/bull.config'),
    }),
    QueueModule,

    MongooseModule.forRoot(process.env.DATABASE_URL),
    WebSocketModule,
    UserModule,
    AuthModule,
    RobotModule,
    GreenhouseModule,
    ProductModule,
    AiModule,
    ProcessModule,
  ],
  controllers: [AppController, GreenhouseController],
  providers: [
    AppService,
    IsUniqueEmailConstraints,
    IsUniqueNameConstraints,
    // MqttSendProcessor,
    // ProcessConsumer,
    MqttService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors({ origin: 'http://localhost:3000', credentials: true }))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
