import * as Hapi from 'hapi';
import * as Jwt from 'jsonwebtoken';
import { User } from '../../data/entities/User';
import { UserDao } from '../../data/daos/UserDao';
import { getCustomRepository } from 'typeorm';
import { IServerConfig } from '../../config/Settings';
import { ObjectID } from 'mongodb';
import * as Boom from 'boom';

/**
 * @class
 */
export class UserController{
    private configs:IServerConfig;
    
    constructor(configs:IServerConfig){
        this.configs = configs;

    }

    /**
     * Este método es para el login
     * @param resquest { Hapi.Request } Solicitud del usuario
     * @param reply {Hapi.ReplyNoContinue } Respuesta del servidor
     * @returns { ({token:string}) } retorna un token de autorización         
     */
    public async loginUser(resquest:Hapi.Request, reply:Hapi.ReplyNoContinue){
        
        const email:string = resquest.payload.email;
        const password:string = resquest.payload.password;   
        let userDao = getCustomRepository(UserDao);
        let user1 = new User();
        user1.username = "";

        

        let user = await userDao.findOne({email: email});      
        
        if (!user) {
            return reply(Boom.unauthorized('Usuario o clave incorrectos'));            
        }        

        if(!user.validatePassword(password)){
            return reply(Boom.unauthorized('Usuario o clave incorrectos'));            
        }

        return reply({token: this.generateToken(user)});       
    }

    public async infoUser(resquest:Hapi.Request, reply:Hapi.ReplyNoContinue){

        const id = resquest.auth.credentials.id;
        let userDao = getCustomRepository(UserDao);        
        let user = await userDao.findOneById(new ObjectID(id));
         
        return reply(user);
    }

    public async getUsers(resquest:Hapi.Request, reply:Hapi.ReplyNoContinue){
        let userDao = getCustomRepository(UserDao);
        let users = await userDao.find();

        return reply(users);

    }

    private generateToken(user:User):string{
        const jwtSecret = this.configs.jwtSecret;
        const jwtExpiration = this.configs.jwtExpiration;
        const payload = {id:user.id};     

        return Jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiration});
    }


}