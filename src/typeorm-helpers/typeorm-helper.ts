import {
  DataSource,
  DataSourceOptions,
  EntityTarget,
  ObjectLiteral,
} from 'typeorm';

export class TicketGeneratorRepository {
  static getProvidersForTicketGenerator<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>,
  ) {
    return {
      provide: TicketGeneratorRepository.getName(entity),
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: ['DATA_SOURCE'],
    };
  }

  static getName<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) {
    return addRepositoryWithEntity(entity['name']);
  }

  static generateDataSources = (options: DataSourceOptions[]) => {
    return options.map((v) => {
      return {
        provide: 'DATA_SOURCE',
        useFactory: () => new DataSource(v).initialize(),
      };
    });
  };
}

export const addRepositoryWithEntity = (str: string) =>
  str.concat('Repository');
