import { Role } from 'src/modules/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HelperEntity } from 'src/modules/bases/helper.entity';
import { StatusEnum } from '../enums/status.enum';
import { Exclude, Expose, Transform } from 'class-transformer';

@Entity()
export class User extends HelperEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  firstName: string;

  @Column()
  @Exclude()
  lastName: string;

  @ManyToOne(() => Role, { eager: true })
  @Transform((value) => value.obj.role?.name)
  role: Role;

  @Column({ default: StatusEnum.INACTIVE })
  @Exclude()
  status: number;

  @Column({ nullable: true, type: String })
  @Exclude()
  hash: string;

  @CreateDateColumn()
  createAt: Date;

  @Expose({ name: 'fullName' })
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
