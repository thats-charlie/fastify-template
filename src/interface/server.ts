import { FastifyReply } from 'fastify';


export enum HTTPMethod
{
    GET    = 'GET',
    POST   = 'POST',
    PUT    = 'PUT',
    DELETE = 'DELETE',
    PATCH  = 'PATCH',
    HEAD   = 'HEAD'
}

declare module 'fastify' 
{
    export interface FastifyInstance
    {
        authenticate_refresh : (request : FastifyRequest, reply : FastifyReply) => void;
        authenticate_user    : (request : FastifyRequest, reply : FastifyReply) => void;
        authenticate_admin   : (request : FastifyRequest, reply : FastifyReply) => void;
    }

    export interface FastifyRequest
    {
        user : {
            uuid     : string;
            rank     : string;
            username : string;
        }
    }
}