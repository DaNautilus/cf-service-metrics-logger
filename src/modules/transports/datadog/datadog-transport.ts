import { DatabaseType } from '../../../database-metrics-logger';
import { getFromObjectPath } from '../../../helpers/get-from-object-path';
import { Rest } from '../../../helpers/rest';
import { mongoDbMetrics } from './metrics/mongodb-metrics';
import { redisMetrics } from './metrics/redis-metrics';

export type TTimeSeriesPoints = [number, any];

enum MetricTypeEnum {
  Gauge = 'gauge',
  Rate = 'rate',
  Count = 'count',
}

export interface IMetric {
  metric: string;
  points: TTimeSeriesPoints[];
  type?: MetricTypeEnum;
  interval?: number;
  host?: string;
  tags?: string[];
}

interface IDatadogOptions {
  apiKey: string;
  appKey?: string;
  host?: string;
}

export class DatadogTransport {
  private rest: Rest;

  constructor(config: IDatadogOptions) {
    const host = config.host || 'app.datadoghq.com';

    this.rest = new Rest({
      host: `https://${host}/api/v1`,
      query: { api_key: config.apiKey, application_key: config.appKey },
    });
  }

  public getMetrics(from: string): Promise<any> {
    return this.rest.get('/metrics', { from });
  }

  public postMetrics(metrics: {}): Promise<any> {
    const mappedMetrics = this.mapMetrics(metrics);
    const metricsBody = JSON.stringify({ series: mappedMetrics, host: 'bubu' });
    return this.rest.post('/series', metricsBody);
  }

  private mapMetrics(metrics: any): IMetric[] {
    let metricFieldsMap = {};

    switch (metrics.databaseType) {
      case DatabaseType.Redis:
        metricFieldsMap = redisMetrics;
        break;
      case DatabaseType.Mongodb:
        metricFieldsMap = mongoDbMetrics;
        break;
      default:
    }

    const metricKeys = Object.keys(metricFieldsMap);
    const timeStamp = new Date().getTime() / 1000;

    return metricKeys.map(metricKey => {
      const metricValue = getFromObjectPath(metrics.metrics, metricFieldsMap[metricKey]);
      const points: TTimeSeriesPoints[] = [[timeStamp, metricValue]];

      return {
        metric: metricKey,
        points,
        tags: [`service-name:${metrics.name}`],
      };
    });
  }
}
