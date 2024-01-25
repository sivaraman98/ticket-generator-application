import { Module } from '@nestjs/common';
import { TicketGeneratorController } from './ticket-generator.controller';
import { TicketGeneratorService } from './ticket-generator.service';
import { environment } from './environments/environment';

@Module({
  imports: [],
  controllers: [TicketGeneratorController],
  providers: [
    TicketGeneratorService,
    ...environment.dataSources,
    ...environment.entityProviders,
  ],
})
export class TicketGeneratorModule {}
