import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { Data } from '../interface';
import { catcher } from './catcher';
export class Router
{
    server : FastifyInstance;

    constructor(
        server     : FastifyInstance
    )
    {
        this.server  = server;
    }

    add(
        routes : Array<Data>, 
        config : Data = {}
    )
    {
        routes.forEach(({ handler, ..._route }) =>
        {
            const route = _route as RouteOptions;
            this.server.route({
                ...config,
                ...route,
                handler : catcher(handler)
            });
        });
    }
}