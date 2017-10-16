import { IPlugin, IPluginInfo,IPluginOptions } from '../interfaces';

export default ():IPlugin=>{
  return {
    register: ():Promise<void>=>{
      return new Promise<void>(resolve=>{

      });
    },      
    info:{
      name: 'JWT Authentication',
      version: '1.0.0'
    }
    
  }
}