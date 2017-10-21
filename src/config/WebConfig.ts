import * as Hapi from 'hapi';
import { IServerConfig } from './Settings';
import { UserResource } from '../bussines/api/UserResource';
import { IPlugin } from '../plugins/interfaces';

export const init = (configs:IServerConfig):Promise<Hapi.Server>=>{
  return new Promise<Hapi.Server>((resolve)=>{
    const server = new Hapi.Server();
    server.connection({
      host: configs.host,
      port: configs.port
    });

    if (configs.routePrefix) {
      server.realm.modifiers.route.prefix = configs.routePrefix;
    }

    const plugins:Array<string> = configs.plugins;
    const pluginOptions = {
      serverConfig: configs
    }

    let pluginPromises:any[] = [];

    plugins.forEach(pluginName =>{      
      let plugin:IPlugin = (require(`../plugins/${pluginName}`)).default();
      console.log(`Registrando plugin ${plugin.info().name} v${plugin.info().version}`);
      pluginPromises.push(plugin.register(server, pluginOptions));
    });

    Promise.all(pluginPromises).then( () => {
      console.log('Todos los plugins se registraron con éxito.');
      console.log('Registrando routers.');
      new UserResource(server, configs);
      console.log('Routers registrados con éxito.');
      
      resolve(server);
    });
    
  });
}