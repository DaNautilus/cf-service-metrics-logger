import { toPercentage } from '../../../helpers/converters';
import { IMetricDefinition } from '../interfaces/metric-definition.interface';

export const mongoDbDefinitions: IMetricDefinition[] = [
  {
    metric: 'serverStatus.opcounters.getmore',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.opcounters.query',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.opcounters.delete',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.opcounters.insert',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.opcounters.update',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.globalLock.activeClients.readers',
  },
  {
    metric: 'serverStatus.globalLock.activeClients.writers',
  },
  {
    metric: 'serverStatus.globalLock.currentQueue.readers',
  },
  {
    metric: 'serverStatus.globalLock.currentQueue.writers',
  },
  {
    metric: 'serverStatus.connections.current',
  },
  {
    metric: 'serverStatus.connections.available',
  },
  {
    metric: 'serverStatus.mem.mapped',
  },
  {
    metric: 'serverStatus.mem.resident',
  },
  {
    metric: 'serverStatus.mem.virtual',
  },
  {
    metric: 'serverStatus.extra_info.page_faults',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'dbStats.dataSize',
  },
  {
    metric: 'serverStatus.metrics.cursor.open.total',
  },
  {
    metric: 'serverStatus.metrics.cursor.timedOut',
  },
  {
    metric: 'serverStatus.asserts.msg',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.asserts.warning',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.asserts.regular',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.asserts.user',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'serverStatus.asserts.rollovers',
    calculateDifferencePerSecond: true,
  },
  {
    metric: 'custom.freeMemorySize',
    calculate: metrics => metrics.serverStatus.mem.virtual - metrics.serverStatus.mem.resident,
  },
  {
    metric: 'custom.usedMemoryPercentage',
    calculate: metrics => toPercentage(metrics.serverStatus.mem.resident, metrics.serverStatus.mem.virtual),
  },
  {
    metric: 'custom.freeStorageSize',
    calculate: metrics => metrics.dbStats.fsTotalSize - metrics.dbStats.fsUsedSize,
  },
  {
    metric: 'custom.usedStoragePercentage',
    calculate: metrics => toPercentage(metrics.dbStats.fsUsedSize, metrics.dbStats.fsTotalSize),
  },
];
