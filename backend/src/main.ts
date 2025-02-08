import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // 👈 This enables CORS for all origins

  await app.listen(3000);
}
bootstrap();
