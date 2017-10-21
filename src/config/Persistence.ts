import { createConnection, Connection } from 'typeorm';
import { IDataBaseConfig } from './Settings';
import * as path from 'path';

export const init = (configs:IDataBaseConfig)=>{
  createConnection({
    type: configs.type,
    host: configs.host,
    port: configs.port,
    database: configs.database,
    entities: [
      path.join(path.dirname(__dirname), '/data/entities/*.js')      
    ]
  }).then(connection => {
    console.log(`Se estableció conexión con la base de datos ${configs.database}`);   
    
  }).catch(err => {
    console.log(`No se estableció con la base de datos ${configs.database}`, err);    
  });
}