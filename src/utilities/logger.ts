import { Logtail } from '@logtail/node';
import { LOGTAIL_SECURE_TOKEN, IS_PRODUCTION } from '../utilities';

interface Logger {
    info: (log: string) => void;
    warn: (log: string) => void;
    error: (log: string) => void;
}

const developmentLogger : Logger = {
    info: (log) => { console.log(log); },
    warn: (log) => { console.warn(log); },
    error: (log) => { console.error(log); },
}

export const logger : Logger = IS_PRODUCTION ? new Logtail(LOGTAIL_SECURE_TOKEN) : developmentLogger;



