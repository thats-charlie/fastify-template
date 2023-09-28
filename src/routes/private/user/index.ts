import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { HTTPMethod, RoutePluginOptions } from '../../../interface';
import { Router } from '../../../utilities';
import { user } from './get';

enum UserPath
{
    USER = '/user'
}

const UserRoutes : FastifyPluginCallback<RoutePluginOptions> = (
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
            method  : HTTPMethod.GET,
            url     : UserPath.USER,
            handler : user(actors)
        }
    ],
    {
        config : {
            rateLimit : {
                max : 10,
                timeWindow : '1 minute'
            }
        },
        preValidation: [ server.authenticate_user ]
    });

    done();
};

export default UserRoutes;