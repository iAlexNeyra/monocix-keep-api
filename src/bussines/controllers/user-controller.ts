import * as Hapi from 'hapi';
import { User } from '../../data/entities/user';
import { UserDao } from '../../data/daos/user-dao';
import { getCustomRepository } from 'typeorm';

export class UserController{
    public async loginUser(resquest:Hapi.Request, reply:Hapi.ReplyNoContinue){
        let userDao = getCustomRepository(UserDao);
        let user = new User();
        user.username = 'ialexneyra';
        user.email = 'ialexneyra@gmail.com';
        await userDao.save(user)
        return reply(userDao.find());
    }
}