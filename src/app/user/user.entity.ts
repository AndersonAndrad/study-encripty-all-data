import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  _id: ObjectID;
}
