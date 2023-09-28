import { FastifyReply, FastifyRequest } from 'fastify';
// import { logger } from '../utilities';


export const catcher = (
    routeHandler : (
        request : FastifyRequest, 
        reply : FastifyReply
    ) => Promise<void>
) : (
    request : FastifyRequest, 
    reply : FastifyReply
) => void => 
{
    return async (request : FastifyRequest, reply : FastifyReply) =>
    {
        try { await routeHandler(request, reply); }
        catch (error : any)
        {
            const message = error?.message;
            // logger.error(message);
            
            reply.code(400);
            reply.send({ error : message });
        }
    
        return;
    };
};