import * as Hapi from 'hapi';
import { UserController } from '../controllers/user-controller';

export class UserResource{

  private server:Hapi.Server
  private useController:UserController;

  constructor(server:Hapi.Server){
    this.server = server;
    this.useController = new UserController();
    this.server.bind(this.useController);
    this.loginUser();
  }

  public loginUser(){
    this.server.route({
      method: 'GET',
      path: '/users/login',      
      handler: this.useController.loginUser
    });
  }
}