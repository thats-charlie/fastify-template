export const NODE_ENV             = process.env.NODE_ENV ?? 'development';
export const REFRESH_TOKEN_TTL    = 60 * 60 * 24 * 30;
export const ACCESS_TOKEN_TTL     = 60 * 60 * 24;
export const PORT                 = 8080;
export const IS_PRODUCTION        = NODE_ENV === 'production'; 
export const LOGTAIL_SECURE_TOKEN = process.env.LOGTAIL_SECURE_TOKEN ?? 'placeholder';