import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { TicketGeneratorService } from './ticket-generator.service';
import { ICreateTambolaTicket } from './interfaces/ticket-generator.interfaces';
import { framedResponse } from './utils/response-framer';
import { validateCreateTambolaTicket, validateGetAllTambolaTickets } from './validators/ticket-generator.validator';

@Controller()
export class TicketGeneratorController {
  private logger: Logger;
  constructor(private readonly ticketService: TicketGeneratorService) {
    this.logger = new Logger('TICKET_GENERATOR_CONTROLLER');
  }

  private log(message: string) {
    this.logger.log(`${message}`);
  }
  private logError(message: string) {
    this.logger.error(`${message}`);
  }

  @Post('/createTambolaTicket')
  createTambolaTicket(@Body() body: ICreateTambolaTicket) {
    try {
      this.logger.log(
        `Request received for creating Tambola tickets.`,
      );

      const validatedData = validateCreateTambolaTicket(body);
      
      return this.ticketService.createTambolaTicket(validatedData);
    } catch (error) {
      this.logger.error(
        `Errored while creating Tambola tickets with message: ${error.message}`,
      );
      return framedResponse('ERROR', `${error.message}`);
    }
  }

  @Get('/getAllTambolaTickets')
  getAllTambolaTickets(@Body() body: { pageNumber?: number }) {
    try {
      this.logger.log(
        `Request received for getting all the Tambola tickets created previously.`,
      );
      
      const validatedData = body.pageNumber ? validateGetAllTambolaTickets(body.pageNumber) : 1;
      
      return this.ticketService.getAllTambolaTickets(validatedData);
    } catch (error) {
      this.logger.error(
        `Errored while creating Tambola tickets with message: ${error.message}`,
      );
      return framedResponse('ERROR', `${error.message}`);
    }
  }
}
