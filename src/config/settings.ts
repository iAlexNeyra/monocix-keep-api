import * as nconf from 'nconf';
import * as path from 'path';

const configs = new nconf.Provider({
  store: {
    type: 'file',
    file: `./${process.env.NODE_ENV}.json`,
  }
});

export interface IServerConfig {
  host: string
  port: number
  plugins: string[]
}

export interface IDataBaseConfig{
  type: 'mongodb'
  host: string
  port: number
  database: string
}

export const getServerConfig = ():IServerConfig=>{

  return configs.get('server');
}

export const getDataBaseConfig = ():IDataBaseConfig=>{

  return configs.get('database')
}
