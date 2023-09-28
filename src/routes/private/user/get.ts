import { FastifyRequest, FastifyReply } from 'fastify';
import Actors from '../../../actors';

export type GetRequest = FastifyRequest<{ 
    Params : {
        id: string;
    }
}>;

export const user = (
    actors : Actors
) : (
    request : GetRequest, 
    reply : FastifyReply
) => void => 
{
    return async (request : GetRequest, reply : FastifyReply) => 
    {
        const { uuid } = request.user;

        const user = await actors.user.getUser(uuid);

        if (user)
        {
            reply.code(200);
            reply.send(user);
        }
        else
        {
            reply.code(404);
            reply.send(`Unable to find user with uuid: ${uuid}`)
        }
        
        return;
    };
};