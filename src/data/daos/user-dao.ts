import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user'

@EntityRepository(User)
export class UserDao extends Repository<User>{

}