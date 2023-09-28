import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { HTTPMethod, RoutePluginOptions } from '../../../interface';
import { Router } from '../../../utilities';


enum AdminPath
{
    USER = '/user/:id',
    CREATE_ADMIN = '/create'
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
            method  : HTTPMethod.GET,
            url     : AdminPath.USER,
            handler : user(actors)
        },
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