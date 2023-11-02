import { HelperEntity } from 'src/modules/bases/helper.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Forgot extends HelperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  hash: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @CreateDateColumn()
  createAt: Date;
}
