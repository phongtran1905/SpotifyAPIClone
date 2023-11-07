import { Track } from 'src/modules/tracks/entities/track.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[];

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createAt: Date;
}
