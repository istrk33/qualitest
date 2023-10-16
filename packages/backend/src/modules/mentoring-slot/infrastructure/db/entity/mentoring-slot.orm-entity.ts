import { MentoringSlotStatusEnum } from '@src/modules/mentoring-slot/domain/model/const/mentoring-slot-status.enum';
import slugify from 'slugify';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('mentoring_slot')
export default class MentoringSlotOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'slug' })
  slug: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.startDate + '-' + this.endDate, { lower: true });
  }

  @Column({ name: 'status', default: MentoringSlotStatusEnum.Incoming })
  status: string;

  @Column({ name: 'was_missed_by_mentor', type: 'boolean', nullable: true })
  wasMissedByMentor: boolean | null;

  @Column({ name: 'is_downgraded', type: 'boolean', nullable: true })
  isDowngraded: boolean | null;
}
