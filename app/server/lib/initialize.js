import logger from 'winston';
import { config } from '../lib';

logger.level = config.LOGGER_LEVEL || (config.NODE_ENV === 'development' ? 'debug' : 'info');
