import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponseObject, framedResponse } from './utils/response-framer';
import { TicketGeneratorEntity } from './entities/ticket-generator.entity';
import { Repository } from 'typeorm';
import { ITicket, ITicketsResponse } from './interfaces/ticket-generator.interfaces';

@Injectable()
export class TicketGeneratorService {
  private logger: Logger;
  constructor(
    @InjectRepository(TicketGeneratorEntity)
    private ticketGeneratorRepo: Repository<TicketGeneratorEntity>,
  ) {
    this.logger = new Logger('TICKET_GENERATOR_SERVICE');
  }

  private log(message: string) {
    this.logger.log(`${message}`);
  }
  private logError(message: string) {
    this.logger.error(`${message}`);
  }

  async createSingleTambolaTicket() {
    try {
      this.logger.log(`Request received for creating a single tambola ticket.`);

      const createdTicket = [[], [], []];
      const totalPossibilityOfNumbers = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
        [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
        [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
        [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
      ];

      for (let i = 0; i < totalPossibilityOfNumbers.length; i++) {
        let randomNumbers = [];
        let firstSet = totalPossibilityOfNumbers[i];
        for (let j = 0; j < 3; j++) {
          let randomIndex = Math.floor(Math.random() * firstSet.length);
          randomNumbers.push(firstSet[randomIndex]);
          firstSet.splice(randomIndex, 1);
        }
        for (let k = 0; k < randomNumbers.length; k++) {
          const sortedRandomNumbers = randomNumbers.sort((a, b) => a - b);
          createdTicket[k].push(sortedRandomNumbers[k]);
        }
      }

      for (let i = 0; i < createdTicket.length; i++) {
        let randomIntegers = [];
        for (let j = 0; j < 4; ) {
          const randomIndex = Math.floor(
            Math.random() * createdTicket[i].length,
          );
          if (randomIntegers.indexOf(createdTicket[i][randomIndex]) !== -1) {
            continue;
          }
          randomIntegers.push(createdTicket[i][randomIndex]);
          j++;
        }
        createdTicket[i] = createdTicket[i].map((num) =>
          randomIntegers.includes(num) ? 0 : num,
        );
      }
      this.logger.log(
        `Single ticket successfully created with data: ${createdTicket}`,
      );

      return createdTicket as number[][];
    } catch (error) {
      this.logger.error(
        `Errored while creating a single tambola ticket with message: ${error}`,
      );
      throw `${error}`;
    }
  }

  async createTambolaTicket(numberOfTickets: number): Promise<IResponseObject<ITicketsResponse>> {
    try {
      this.logger.log(
        `Request received for creating ${numberOfTickets} tambola tickets.`,
      );

        const totalTickets = [];
        for (let i = 0; i < numberOfTickets;) {
          const createdTambolaTicket = await this.createSingleTambolaTicket();

          const isTambolaTicketPresent = await this.ticketGeneratorRepo.findOne({ where: { ticket: JSON.stringify(createdTambolaTicket)}})

          if (isTambolaTicketPresent) {
             continue;
          }
          totalTickets.push(createdTambolaTicket);
          i++;
        }

        for (const ticket of totalTickets) {
          const createdTicket = await this.ticketGeneratorRepo.create({ ticket: JSON.stringify(ticket) });
          await createdTicket.save();
        } 

        const createdTickets = (await this.ticketGeneratorRepo.find({ order: { createdAt: 'DESC' }, take: numberOfTickets, select: ['id', 'ticket']})).reverse();
        const desiredTicketsResponse = await this.convertEntityObjectsToTicketResponse(createdTickets);
        
        this.logger.log(`${numberOfTickets} number of Tambola tickets successfully created with data: ${JSON.stringify(desiredTicketsResponse)}`);

        return framedResponse('SUCCESS', `${numberOfTickets} Tambola tickets successfully generated.`, desiredTicketsResponse);
    } catch (error) {
      this.logger.error(
        `Errored while creating a tambola ticket with message: ${error.message}`,
      );
      return framedResponse('ERROR', `${error.message}`);
    }
  }

  async getAllTambolaTickets(pageNumber: number) {
    try {
      this.logger.log(`Request received for getting all tambola tickets.`);

      const take = 20;
      const skip = (pageNumber - 1) * take;
      const savedTickets = await this.ticketGeneratorRepo.findAndCount({ take: 20, skip });
      const desiredTicketsResponse = await this.convertEntityObjectsToTicketResponse(savedTickets[0]);
      this.logger.log(`All the tambola tickets successfully fetched with data: ${JSON.stringify(desiredTicketsResponse)}`);

      return framedResponse('SUCCESS', `All the tambola tickets successfully fetched.`, desiredTicketsResponse);
    } catch (error) {
      this.logger.error(
        `Errored while getting all tambola tickets with message: ${error.message}`,
      );
      return framedResponse('ERROR', `${error.message}`);
    }
  }

  async convertEntityObjectsToTicketResponse(createdTickets: TicketGeneratorEntity[]): Promise<ITicketsResponse> {
    try {
      const tickets: ITicket = {};

      createdTickets.forEach((ticketEntity) => {
        tickets[ticketEntity.id] = JSON.parse(ticketEntity.ticket);
      });
      
      return { tickets };
    } catch (error) {
      this.logger.error(
        `Errored while converting entity objects to ticket response with message: ${error}`,
      );
      throw new Error(error);
    }
  }
}
