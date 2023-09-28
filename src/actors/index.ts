import Services from '../services';
import Admin from './admin';
import User from './user';


export default class Actors
{
    admin  : Admin;
    user   : User;
    
    constructor(services : Services)
    {
        this.user = new User(services);
        this.admin = new Admin(services);
    }
}