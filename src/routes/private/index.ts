import Admin from './admin';
import User from './user';
import { RoutePlugin } from '../../interface';

export const PrivateRoutes : Array<RoutePlugin> = [
    Admin,
    User
];