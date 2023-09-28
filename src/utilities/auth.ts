import { FastifyInstance, FastifyRequest, FastifyReply, FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Data } from '../interface';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from './constants';

export enum AccessLevel
{
    REFRESH     = 'REFRESH',
    USER        = 'USER',
    PRO_USER    = 'PRO_USER',
    ADMIN       = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

export const AccessRank = {
    [AccessLevel.REFRESH]     : 0,
    [AccessLevel.USER]        : 1,
    [AccessLevel.PRO_USER]    : 2,
    [AccessLevel.ADMIN]       : 3,
    [AccessLevel.SUPER_ADMIN] : Infinity,
} as { [key : string] : number };


export type JWTResolution = {
    uuid?     : string;
    level?    : string;
    username? : string;
    email?    : string; 
    valid     : boolean;
};

export type JWTPayload = {
    iat      : number;
    uuid     : string;
    level    : string;
    username : string;
    email    : string;
    ref      : number;
};


export const verifyAccessLevel = (server : FastifyInstance) => 
{
    return (jwt : string | undefined, accessLevel : AccessLevel) : Promise<JWTResolution> => 
    {
        return new Promise((resolve) => 
        {
            if (!jwt)
            {   
                resolve({ valid : false });
            }
            else
            {
                server.jwt.verify(jwt, (error, decoded) =>
                {
                    if (error) resolve({ valid : false });
                    else
                    {
                        const { iat, uuid, level, ref, username, email } = decoded as JWTPayload;
                        const secondsSinceEpoch = Date.now() / 1000;
                        const hasAccessExpired = secondsSinceEpoch - iat > ACCESS_TOKEN_TTL; 
                        const hasRefreshExpired = secondsSinceEpoch - iat > REFRESH_TOKEN_TTL; 
                        const minimumRank = AccessRank[accessLevel as string];
                        const tokenRank = AccessRank[level];
                        const hasAccess = tokenRank >= minimumRank;

                        const isValidAccess = iat && uuid && !hasAccessExpired && hasAccess && !ref;
                        const isValidRefresh = ref && !hasRefreshExpired && accessLevel == AccessLevel.REFRESH;
                        if (isValidAccess || isValidRefresh)
                        {
                            resolve({
                                valid : true,
                                uuid,
                                level,
                                username,
                                email
                            });
                        }
                        else resolve({ valid : false });
                    }                
                });
            }
        });
    };
};

export const authenticate = (secrets : Data) =>
{
    const { 
        ECDSA_PUBLIC_KEY,
        ECDSA_PRIVATE_KEY,
        ECDSA_CERT_PASSPHRASE
    } = secrets;

    return fastifyPlugin(async (server : FastifyInstance) => 
    {
        server.register(import('fastify-jwt'), {
            secret: {
                private: {
                    key : ECDSA_PRIVATE_KEY.split('\\n').join('\n'),
                    passphrase : ECDSA_CERT_PASSPHRASE
                },
                public : ECDSA_PUBLIC_KEY.split('\\n').join('\n')
            },
            sign: { algorithm: 'ES256' }
        });
    
        const verifyAccess = verifyAccessLevel(server);
        
        Object.keys(AccessLevel).forEach(key =>
        {
            const accessLevel = key as AccessLevel;
    
            server.decorate(`authenticate_${accessLevel.toLowerCase()}`, async (request : FastifyRequest, reply : FastifyReply) =>
            {
                const authorization = request.headers.authorization;
                
                if (authorization)
                {
                    try
                    {
                        const token = authorization.split(' ').at(1);
                        const {
                            valid,
                            uuid,
                            level,
                            username
                        } = await verifyAccess(token, accessLevel);
    
                        if (valid && uuid)
                        {
                            request.user = {
                                uuid     : uuid  ?? '',
                                rank     : level  ?? '',
                                username : username ?? '',
                            };
    
                            return;
                        }
                    }
                    catch (error)
                    {
                        reply
                            .code(401)
                            .send(error);
                        return;
                    }
                }
    
                reply
                    .code(401)
                    .send();
                return;
            });
        });
    });
};



