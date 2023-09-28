import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { HTTPMethod, RoutePluginOptions } from '../../../interface';
import { Router } from '../../../utilities';
import { login } from './auth';

enum AuthPath
{
    LOGIN = '/login',
}

const AuthRoutes : FastifyPluginCallback<RoutePluginOptions> = (
    server : FastifyInstance, 
    {
        services,
        actors
    }, 
    done
) => 
{
    const router = new Router(server);

    router.add([
        {
            method  : HTTPMethod.POST,
            url     : AuthPath.LOGIN,
            handler : login(actors, server)
        }
    ],
    {
        config : {
            rateLimit : {
                max : 10,
                timeWindow : '1 minute'
            }
        }
    });

    done();
};

export default AuthRoutes;



