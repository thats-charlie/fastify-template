import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { HTTPMethod, RoutePluginOptions } from '../../../interface';
import { Router } from '../../../utilities';
import { createAdmin } from './create';


enum AdminPath
{
    CREATE_ADMIN = '/admin'
}

const AdminRoutes : FastifyPluginCallback<RoutePluginOptions> = (
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
            url     : AdminPath.CREATE_ADMIN,
            handler : createAdmin(actors)
        }
    ],
    {
        config : {
            rateLimit : {
                max : 10,
                timeWindow : '1 minute'
            }
        },
        preValidation: [ server.authenticate_admin ]
    });

    done();
};

export default AdminRoutes;