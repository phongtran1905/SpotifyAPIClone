import { HelperEntity } from 'src/modules/bases/helper.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Genre extends HelperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createAt: Date;
}
