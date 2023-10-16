import { MentoringSlotStatusEnum } from '@src/modules/mentoring-slot/domain/model/const/mentoring-slot-status.enum';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';

export class MentoringSlotPresenter {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  slug: string;
  status: keyof typeof MentoringSlotStatusEnum;
  wasMissedByMentor: boolean;
  isDowngraded: boolean;

  constructor(mentoringSlot: MentoringSlot) {
    this.id = mentoringSlot.id;
    this.createdAt = mentoringSlot.createdAt;
    this.updatedAt = mentoringSlot.updatedAt;
    this.startDate = mentoringSlot.startDate;
    this.endDate = mentoringSlot.endDate;
    this.slug = mentoringSlot.slug;
    this.status = mentoringSlot.status;
    this.wasMissedByMentor = mentoringSlot.wasMissedByMentor;
    this.isDowngraded = mentoringSlot.isDowngraded;
  }
}
