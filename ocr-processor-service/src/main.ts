import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbit:5672'],
      queue: 'ocr-queue',
      queueOptions: {
        durable: false,
      },
      port: 3001,
    },
  });
  await app.listen().finally(() => console.log('Microservice is listening'));
}
bootstrap();
