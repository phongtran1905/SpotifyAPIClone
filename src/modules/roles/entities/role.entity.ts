import { HelperEntity } from 'src/modules/bases/helper.entity';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Role extends HelperEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;

  @CreateDateColumn()
  createAt: Date;
}
