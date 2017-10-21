import { EntityRepository, MongoRepository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserDao extends MongoRepository<User>{
    
}