import * as Hapi from 'hapi';
import { IServerConfig } from './settings';
import { UserResource } from '../bussines/api/user-resource';

export const init = (configs:IServerConfig):Promise<Hapi.Server>=>{
  return new Promise<Hapi.Server>((resolve)=>{
    const server = new Hapi.Server();
    server.connection({
      host: configs.host,
      port: configs.port
    });

    let plugins = configs.plugins;

    plugins.forEach(plugin =>{
      console.log(plugin);
      
    });

    new UserResource(server);
    
    resolve(server);
  });
}