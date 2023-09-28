import { FastifyReply, FastifyRequest } from 'fastify';
import Actors  from '../../../actors';

export const health = (
    actors : Actors
) : (
    request : FastifyRequest, 
    reply : FastifyReply
) => Promise<void> => 
{
    return async (request : FastifyRequest, reply : FastifyReply) =>
    {
        reply.status(200);

        reply.send({ status : 'online' });
        return;
    };
};