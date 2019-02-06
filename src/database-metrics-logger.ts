import { logger } from './helpers/logger';
import { mergeDeep } from './helpers/merge-deep';
import { PubSub } from './helpers/pub-sub';
import { MongoDbMetrics } from './modules/database-metrics/mongo-db-metrics';
import { RedisMetrics } from './modules/database-metrics/redis-metrics';

const defaultOptions = {
  interval: 10000,
};

export enum DatabaseMetricsEvent {
  Metrics = 'metrics',
  Logs = 'logs',
}

export enum DatabaseType {
  MongoDb = 'mongoDb',
  Redis = 'redis',
}

export interface IDatabaseCredentials {
  databaseType: DatabaseType;
  host?: string;
  port?: number;
  uri?: string;
  username?: string;
  password?: string;
  database?: string;
  interval?: number;
}

export class DatabaseMetricsLogger extends PubSub {
  private databaseCredentials: IDatabaseCredentials[];
  private dbMetricsCollection: (MongoDbMetrics | RedisMetrics)[] = [];

  constructor(
    databaseCredentials: IDatabaseCredentials[] = []
  ) {
    super();
    this.databaseCredentials = databaseCredentials
      .map(serviceCredential => mergeDeep({}, defaultOptions, serviceCredential) as IDatabaseCredentials);
  }

  public start(): void {
    logger.subscribe(undefined, value => this.publish(DatabaseMetricsEvent.Logs, value));

    this.databaseCredentials.forEach(credentials => {
      let databaseMetrics: any;

      switch (credentials.databaseType) {
        case DatabaseType.MongoDb:
          databaseMetrics = new MongoDbMetrics(credentials);
          break;
        case DatabaseType.Redis:
          databaseMetrics = new RedisMetrics(credentials);
          break;
        default:
          break;
      }

      databaseMetrics.getMetrics().subscribe(undefined, metrics =>
        this.publish(DatabaseMetricsEvent.Metrics, metrics));

      this.dbMetricsCollection.push(databaseMetrics);
    });
  }

  public stop(): void {
    this.unsubscribeAll();
    this.dbMetricsCollection.forEach(dbMetrics => dbMetrics.stop());
    this.dbMetricsCollection = [];
    logger.unsubscribeAll();
  }
}
