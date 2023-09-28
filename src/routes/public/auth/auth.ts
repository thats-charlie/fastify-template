import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Actors from '../../../actors';

type AuthRequest = FastifyRequest<{
    Body : {
        email : string;
        password : string;
    }
}>;

export const login = (
    actors : Actors,
    server : FastifyInstance
) : (
    request : AuthRequest, 
    reply : FastifyReply
) => void => 
{
    return async (request : AuthRequest, reply : FastifyReply) => 
    {
        const { email, password } = request.body;
        const user = await actors.user.authenticate(email, password);

        if (user) {

            const {
                uuid,
                username,
                level,
                email
            } = user;

            let access = '';
            let refresh = '';

            try {
                // TODO: Configure ECDSA KEYS
                access = server.jwt.sign({ uuid, email, level, ref : 0, username });
                refresh = server.jwt.sign({ uuid, email, level, ref : 1, username });
            }
            catch(_) {}
            
            reply.status(200);
            reply.send({
                ...user,
                access,
                refresh
            });
        }
    };
};