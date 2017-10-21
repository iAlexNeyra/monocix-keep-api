import { IServerConfig } from '../config/settings';
import * as Hapi from 'hapi';

export interface IPluginOptions{
    serverConfig:IServerConfig
}

export interface IPlugin{
  register(server:Hapi.Server, options?:IPluginOptions): Promise<void>
  info(): IPluginInfo
}

export interface IPluginInfo{
  name:string
  version:string  
}

