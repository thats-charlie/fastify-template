import * as HTTP from 'http';
import type { FastifyPluginCallback, FastifyPluginOptions, FastifyTypeProvider } from 'fastify';
import type { Data } from '.';
import Services from '../services';
import Actors from '../actors';

export type Routes = Array<{ prefix : string; plugins : Array<RoutePlugin>; }>;

export type ServerPlugin = {
    plugin  : FastifyPluginCallback<FastifyPluginOptions, HTTP.Server, FastifyTypeProvider>;
    options : Data;
};

export type RoutePlugin= FastifyPluginCallback<RoutePluginOptions>;

export type RoutePluginOptions = FastifyPluginOptions & {
    services  : Services;
    actors    : Actors;
}