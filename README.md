# Fastify Template

This is a Fastify base project that is set up with a JWT auth system, authenticated routing, Prisma ORM, and Logtail logging 

## Setup

```bash
yarn install
yarn start
```

### Environment

```
PORT=8080
PSQL_USERNAME=username
PSQL_PASSWORD=password
PSQL_HOSTNAME=localhost
PSQL_DATABASE=development
POSTGRESQL_URL=postgres://$PSQL_USERNAME:$PSQL_PASSWORD@$PSQL_HOSTNAME:5432/$PSQL_DATABASE
LOGTAIL_SECURE_TOKEN=logtail_token
NODE_ENV=development
```

#### Dependencies

- [Fastify](https://fastify.dev/)
- [fastify-jwt](https://www.npmjs.com/package/fastify-jwt)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
- [fastify-blipp](https://www.npmjs.com/package/fastify-blipp)
- [Prisma](https://www.prisma.io/)
- [ts-node](https://www.npmjs.com/package/ts-node)