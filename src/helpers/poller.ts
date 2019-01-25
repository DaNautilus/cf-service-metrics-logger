import { EventEmitter } from 'events';

interface IPollerConfig {
  id?: string;
  interval?: number;
}

export class Poller extends EventEmitter {
  public static pollerIds = {
    mongoDb: {
      serverStatus: 'mongoDb:serverStatus',
      dbStats: 'mongoDb:dbStats',
    },
    redis: {
      info: 'redis:info',
    },
  };

  private static eventIds = {
    poll: 'poll',
  };

  public config: IPollerConfig;

  constructor(config: IPollerConfig = {}) {
    super();

    this.config = config;
    this.config.interval = this.config.interval || 1000;
  }

  public poll(): void {
    setTimeout(() => this.emit(Poller.eventIds.poll), this.config.interval);
  }

  public onPoll(callBack: () => void): void {
    this.on(Poller.eventIds.poll, callBack);
  }
}
