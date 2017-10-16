import { Entity, ObjectIdColumn, Column, ObjectID } from 'typeorm';

@Entity()
export class User{

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username:string

  @Column()
  email:string 
}