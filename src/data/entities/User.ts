import { Entity, ObjectIdColumn, Column, ObjectID, CreateDateColumn, BeforeInsert, BaseEntity } from 'typeorm';
import * as Bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity{

  @ObjectIdColumn()
  id: ObjectID;

  @Column({unique:true})
  username:string

  @Column()
  password:string

  @Column()
  email:string 

  @CreateDateColumn()
  dateJoined:Date

  @BeforeInsert()
  public hashPassword(){
    
    if(!this.password){
      this.password = null;
    }
    this.password = Bcrypt.hashSync(this.password, Bcrypt.genSaltSync(8));
    
  }

  public validatePassword(requestPassword:string):boolean{
    return Bcrypt.compareSync(requestPassword, this.password)
  }

}