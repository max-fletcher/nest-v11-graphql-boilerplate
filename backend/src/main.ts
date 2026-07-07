import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // cors: true,
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
