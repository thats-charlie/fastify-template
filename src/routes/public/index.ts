import Misc from './misc';
import Auth from './auth';
import { RoutePlugin } from '../../interface';

export const PublicRoutes : Array<RoutePlugin> = [
    Misc,
    Auth
];
