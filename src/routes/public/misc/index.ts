import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { HTTPMethod, RoutePluginOptions } from '../../../interface';
import { Router } from '../../../utilities';
import { health } from './health';

enum MiscPath
{
    HEALTH = '/health',
}

const MiscRoutes : FastifyPluginCallback<RoutePluginOptions> = (
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
            url     : MiscPath.HEALTH,
            handler : health(actors)
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

export default MiscRoutes;