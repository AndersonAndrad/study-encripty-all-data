import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  email: string;

  @IsString()
  @Column()
  password: string;
}
