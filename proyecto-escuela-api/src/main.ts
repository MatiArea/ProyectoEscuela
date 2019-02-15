import { NestFactory,FastifyAdapter } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(), { cors: true });
 // const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();

