import { DatabaseType } from '../../../../enums';
import { CloudFoundryServiceType } from '../enums';

export const serviceTypeDatabaseTypeMapper = new Map<CloudFoundryServiceType, DatabaseType>();

serviceTypeDatabaseTypeMapper.set(CloudFoundryServiceType.Mongodb2, DatabaseType.Mongodb);
serviceTypeDatabaseTypeMapper.set(CloudFoundryServiceType.Redis2, DatabaseType.Redis);
