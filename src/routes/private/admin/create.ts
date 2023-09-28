import { FastifyRequest, FastifyReply } from 'fastify';
import Actors from '../../../actors';

export type PostRequest = FastifyRequest<{ 
    Body : {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
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
        const { 
            firstName,
            lastName,
            email,
            password
        } = request.body;

        const user = await actors.admin.createAdmin(firstName, lastName, email, password);

        if (user)
        {
            reply.code(200);
            reply.send(user);
        }
        else
        {
            reply.code(404);
            reply.send(`Unable to create admin`)
        }
        
        return;
    };
};