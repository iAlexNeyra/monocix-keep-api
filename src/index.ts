import * as Server from './config/web-config';
import * as DataBase from './config/persistence';
import { getServerConfig, getDataBaseConfig } from './config/settings';

console.log(`Entorno corriento ${process.env.NODE_ENV}`);

const dbConfig = getDataBaseConfig();
DataBase.init(dbConfig);

const serverConfig = getServerConfig();
Server.init(serverConfig).then(server=>{
    server.start(err => {
      if (err) {
        console.log('Servidor no inicializado', err);
        return;
      }
      console.log(`Servidor corriendo en: ${server.info.uri}`);
      
    });
});
