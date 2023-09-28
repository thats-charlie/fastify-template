import Services from '../services';
import { User, AccessLevel } from '@prisma/client';
import { v4 as uuid} from 'uuid';
import { hashPassword } from '../utilities';

export default class Admin
{
    services : Services;

    constructor(services : Services)
    {
        this.services = services;
    }

    async createAdmin(
        firstName: string,
        lastName: string,
        email: string,
        password : string
    ) : Promise<User>
    {
        const admin = await this.services.prisma.user.create({
            data : {
                uuid: uuid(),
                firstName,
                lastName,
                email,
                level: AccessLevel.ADMIN,
                password: hashPassword(password)
            }
        });

        return admin;
    }
}