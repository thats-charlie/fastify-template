import Fastify, { FastifyInstance } from 'fastify';
import Cluster from 'cluster';
import * as HTTP from 'http';
import { cpus } from 'os';
import Services from './services';
import Actors from './actors';
import { authenticate } from './utilities';
import { PublicRoutes, PrivateRoutes } from './routes';
import { PORT, logger } from './utilities';

export default class Server
{

    services : Services;
    actors   : Actors;

    constructor()
    {
        this.services = new Services();
        this.actors = new Actors(this.services);
    }


    async start(
        concurrentThreads : number = 2
    ) : Promise<void>
    {
        if (Cluster.isPrimary)
        {
            const CPUs = cpus();
            logger.info('Forking to worker threads');
            CPUs.forEach((_, index) => 
            {
                if (index < concurrentThreads)
                {
                    Cluster.fork();
                    logger.info(`Created worker thread #${index}`);
                }
            });

            Cluster.on('exit', worker =>
            {
                logger.info(`Worker thread with PID #${worker.process.pid} died. Restarting...`);
                Cluster.fork();
            });
        }
        else
        {
            try 
            {
                const server : FastifyInstance<
                    HTTP.Server,
                    HTTP.IncomingMessage,
                    HTTP.ServerResponse
                > = Fastify({
                    ignoreTrailingSlash: true,
                    ajv : {
                        customOptions : {
                            strict : 'log'
                        }
                    }
                });
                
                server.register(import('fastify-blipp'));

                server.register(
                    import('@fastify/helmet'),
                    { 
                        contentSecurityPolicy: false 
                    }
                );

                server.register(import('@fastify/rate-limit'), {
                    global : false, 
                    max: 1000, 
                    timeWindow: '1 minute',
                    allowList: [ 'localhost' ]
                });

                server.register(import('@fastify/cors'), {
                    origin : [
                        /http:\/\/localhost(:[0-9]+)?$/ 
                    ]
                });

                server.register(authenticate(this.services.secrets));

                for (const plugin of PublicRoutes)
                {
                    server.register(plugin, { prefix : '/v1', services: this.services, actors: this.actors });
                }

                for (const plugin of PrivateRoutes)
                {
                    server.register(plugin, { prefix : '/v1', services: this.services, actors: this.actors });
                }

                await server.listen({
                    port : PORT,
                    host : '0.0.0.0'
                });
                server.blipp();
                logger.info(`Server starting on port ${PORT}...`);
                 
            }
            catch (error) 
            {
                logger.error(`Server start failed : ${error}`);
            }
        }
    }
}
