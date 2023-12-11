import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';
import { MqttController } from './mqtt/mqtt.controller';
import * as cors from 'cors';
import { WebSocketModule } from './web-socket/web-socket.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { IsUniqueEmailConstraints } from './user/validators/isUniqueEmail.validator';
import { IsUniqueEmail } from './auth/decorators/isUniqueEmail.decorator';
import { RobotModule } from './robot/robot.module';
import { GreenhouseController } from './greenhouse/greenhouse.controller';
import { GreenhouseModule } from './greenhouse/greenhouse.module';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    WebSocketModule,
    UserModule,
    AuthModule,
    RobotModule,
    GreenhouseModule,
    ProductModule,
    AiModule,
  ],
  controllers: [AppController, MqttController, GreenhouseController],
  providers: [AppService, MqttService, IsUniqueEmailConstraints],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors({ origin: 'http://localhost:3000', credentials: true }))
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
