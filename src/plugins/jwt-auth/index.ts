import * as Hapi from 'hapi';
import { UserDao } from '../../data/daos/UserDao';
import { User } from '../../data/entities/User';
import { getCustomRepository, getMongoRepository } from 'typeorm';
import { IPlugin, IPluginInfo,IPluginOptions } from '../interfaces';
import { ObjectID } from 'mongodb';

export default ():IPlugin=>{
  return {
    register: (server:Hapi.Server, options:IPluginOptions):Promise<void>=>{

      const serverConfig = options.serverConfig;
      const validateUser = (decoded:any, request:any, next:Function) => {
        let userDao = getMongoRepository(User);

        userDao.findOneById(new ObjectID(decoded.id))
          .then(user => {
            if (!user) {
              return next(null, false);
            }
            return next(null, true);
          });
      }
      return new Promise<void>(resolve=>{
        server.register({
          register: require('hapi-auth-jwt2')
        }, error => {
          if (error) {
            console.log(`Error al registar jwt plugin: ${error}`);            
          } else {
            server.auth.strategy('jwt', 'jwt', false, {
              key: serverConfig.jwtSecret,
              validateFunc: validateUser,
              verifyOptions: {algorithms:['HS256']},
            });
          }

          resolve();
        });       
      });
    },      
    info: () => ({
      name: 'JWT Authentication',
      version: '1.0.0'
    })
    
  }
}

