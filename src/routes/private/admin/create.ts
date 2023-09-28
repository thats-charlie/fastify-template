import { FastifyRequest, FastifyReply } from 'fastify';
import Actors from '../../../actors';

export type PostRequest = FastifyRequest<{ 
    Body : {
        
    }
}>;

export const createAdmin = (
    actors : Actors
) : (
    request : PostRequest, 
    reply : FastifyReply
) => void => 
{
    return async (request : PostRequest, reply : FastifyReply) => 
    {
        const { id } = request.params;

        const user = await actors.admin.getUser(id);

        if (user)
        {
            reply.code(200);
            reply.send(user);
        }
        else
        {
            reply.code(404);
            reply.send(`Unable to find user with uuid: ${id}`)
        }
        
        return;
    };
};