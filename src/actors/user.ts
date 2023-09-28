import Services from '../services';
import { AccessLevel, User as DBUser } from '@prisma/client';
import { verifyPassword } from '../utilities'
export default class User
{
    services : Services;

    constructor(services : Services)
    {
        this.services = services;
    }

    async getUser(uuid: string) : Promise<DBUser | null> {
        const user = await this.services.prisma.user.findUnique({
            where : {
                uuid
            }
        });

        return user;
    }

    async authenticate(
        email: string, 
        password: string
    ) : Promise<{
        level      : AccessLevel;
        uuid       : string;
        username   : string | null;
        email      : string;
    } | null>
    {
        const user = await this.services.prisma.user.findUnique({
            where : {
                email
            }
        });
        
        if (user && verifyPassword(password, user.password)) {
            return {
                level      : user.level,
                uuid       : user.uuid,
                username   : user.username,
                email      : user.email
            };
        }

        return null;
    }
}