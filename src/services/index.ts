import { PrismaClient } from '.prisma/client';
import { Data } from '../interface';
export default class Services
{
    prisma   : PrismaClient;
    secrets  : Data;

    constructor()
    {
        this.prisma = new PrismaClient();

        // TODO: load from ansible vault
        this.secrets = {
            ECDSA_PUBLIC_KEY      : 'placeholder',
            ECDSA_PRIVATE_KEY     : 'placeholder',
            ECDSA_CERT_PASSPHRASE : 'placeholder'
        };
    }
}
