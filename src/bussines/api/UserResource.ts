import * as Hapi from 'hapi';
import { UserController } from '../controllers/UserController';
import {IServerConfig} from '../../config/Settings';

/**
 * Esta clase es para definir los URI del usuario
 * @class
 * @author Alex D. Neyra <ialexneyra@gmail.com>
 * @version 0.0.1
 */

export class UserResource{

  private server:Hapi.Server
  private userController:UserController;

  constructor(server:Hapi.Server, configs:IServerConfig){
    this.server = server;
    this.userController = new UserController(configs);
    this.server.bind(this.userController);
    this.loginUser();
    this.infoUser();
    this.getUsers();
  }

  /**
   * Este recurso es para el login de usuario
   */
  public loginUser(){
    this.server.route({
      method: 'POST',
      path: '/users/login',      
      handler: this.userController.loginUser,
    });
  }

  /**
   * Este recurso muestra la información del usuario logeado
   */
  public infoUser(){
    this.server.route({
      method: 'GET',
      path: '/users/info',
      config: {
        handler: this.userController.infoUser,
        auth: 'jwt',
      },
    })
  }

  public getUsers(){
    this.server.route({
      method: 'GET',
      path: '/users',
      config:{
        handler: this.userController.getUsers,
        auth: 'jwt',
      }
    });
  }
}