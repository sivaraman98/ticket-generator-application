import { Logger } from "@nestjs/common";
import { ICreateTambolaTicket } from "src/interfaces/ticket-generator.interfaces";

const logger = new Logger('VALIDATE_TICKET_GENERATOR');

export function validateCreateTambolaTicket (data: ICreateTambolaTicket) {
    try {
      logger.log(`Request received for validating create tambola ticket with data: ${JSON.stringify(data)}`);

      if (typeof data.numberOfTickets != 'number') throw new Error(`Invalid type in numberOfTickets. Expecting a number.`);

      return data.numberOfTickets;
    } catch (error) {
      logger.error(`[VALIDATION_ERROR] in create tambola ticket with message : ${error.message}`);
      throw error;
    }
}

export function validateGetAllTambolaTickets (pageNumber: number) {
    try {
      logger.log(`Request received for validating get all tambola tickets.`);

      if (typeof pageNumber != 'number') throw new Error(`Invalid type in pageNumber. Expecting a number.`);

      return pageNumber;
    } catch (error) {
      logger.error(`[VALIDATION_ERROR] in get all tambola tickets with message : ${error.message}`);
      throw error;
    }
}