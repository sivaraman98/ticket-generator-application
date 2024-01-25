import { entitiesToInject } from 'src/entities/ticket-generator.entity';
import { TicketGeneratorRepository } from 'src/typeorm-helpers/typeorm-helper';
import { DataSourceOptions } from 'typeorm';

export const postgresLocalConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'ticket-generator',
  entities: entitiesToInject,
  synchronize: true,
};

export const environment = {
  dataSources: TicketGeneratorRepository.generateDataSources([
    postgresLocalConfig,
  ]),
  entityProviders: entitiesToInject.map((v) =>
    TicketGeneratorRepository.getProvidersForTicketGenerator(v),
  ),
};
