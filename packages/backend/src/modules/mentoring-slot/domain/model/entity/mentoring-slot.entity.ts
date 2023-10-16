import { MentoringSlotStatusEnum } from '@src/modules/mentoring-slot/domain/model/const/mentoring-slot-status.enum';

export default class MentoringSlot {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  startDate: Date;

  endDate: Date;

  slug: string;

  status: keyof typeof MentoringSlotStatusEnum = MentoringSlotStatusEnum.Incoming;

  wasMissedByMentor: boolean | null;

  isDowngraded: boolean | null;

  cancel(): void {
    this.status = MentoringSlotStatusEnum.Canceled;
    this.updatedAt = new Date();
  }

  confirm(): void {
    this.status = MentoringSlotStatusEnum.TookPlace;
    this.updatedAt = new Date();
  }

  delay(): void {
    this.status = MentoringSlotStatusEnum.Delayed;
    this.updatedAt = new Date();
  }

  setIsDowngraded(isDowngraded: boolean): void {
    this.isDowngraded = isDowngraded;
    this.updatedAt = new Date();
  }
}
