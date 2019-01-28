import * as cfenv from 'cfenv';
import * as path from 'path';
import { env } from '../helpers/env';

export enum ServiceType {
  MongoDb = 'mongodb-2',
  Redis = 'redis-2',
}

export class CloudFoundry {
  private appEnvironment: cfenv.IAppEnv;

  constructor(vcap?: {}) {
    this.appEnvironment = vcap
      ? cfenv.getAppEnv({ vcap })
      : cfenv.getAppEnv({ vcapFile: this.getVcapFilePath() });
  }

  public getServicesCredentialsByServiceType(serviceType: ServiceType): cfenv.TCredentials[] {
    const services = this.getServicesByServiceType(serviceType);
    const serviceNames = services.map(service => service.name);

    return serviceNames.map(serviceName => this.appEnvironment.getServiceCreds(serviceName));
  }

  private getServices(): cfenv.IService[] {
    const services = this.appEnvironment.getServices();
    const serviceValues = Object.keys(services).map(key => services[key]);

    if (!serviceValues.length) {
      // this.logger.error('no bound services found');
    }

    return serviceValues;
  }

  private getServicesByServiceType(serviceType: ServiceType): cfenv.IService[] {
    const services = this.getServices();

    const servicesByServiceType = services.filter(service => service.label === serviceType);

    if (services.length && !servicesByServiceType.length) {
      // this.logger.error(`no bound services for service type ${serviceType} found`);
    }

    return servicesByServiceType;
  }

  private getVcapFilePath(): string {
    return path.join(process.cwd(), `vcap${env.app.isTest ? '.test' : ''}.json`);
  }
}
