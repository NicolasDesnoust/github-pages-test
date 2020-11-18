import { Configuration, LoggerLevel } from '../model/configuration';

export const defaultConfiguration: Configuration = {
  env: 'dev',
  logging: {
    level: LoggerLevel.INFO,
  },
};
