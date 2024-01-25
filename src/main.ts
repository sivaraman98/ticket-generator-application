import { NestFactory } from '@nestjs/core';
import { TicketGeneratorModule } from './ticket-generator.module';

async function bootstrap() {
  const app = await NestFactory.create(TicketGeneratorModule);
  await app.listen(3000);
}
bootstrap();
