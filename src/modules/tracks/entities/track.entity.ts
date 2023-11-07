import { Transform } from 'class-transformer';
import { HelperEntity } from 'src/modules/bases/helper.entity';
import { Genre } from 'src/modules/genres/entities/genre.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track extends HelperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  picture: string;

  @Column()
  link: string;

  @Column({ type: 'float' })
  duration: number;

  @ManyToOne(() => Genre, { eager: true })
  @JoinColumn()
  @Transform((value) => value.obj.genre.title)
  genre: Genre;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  @Transform(
    (value) => `${value.obj.user.firstName} ${value.obj.user.lastName}`,
  )
  user: User;

  @CreateDateColumn()
  createAt: Date;
}
