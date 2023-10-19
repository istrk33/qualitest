import { Brackets, DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import MentoringSlotOrm from '@src/modules/mentoring-slot/infrastructure/db/entity/mentoring-slot.orm-entity';
import MentoringSlot from '@src/modules/mentoring-slot/domain/model/entity/mentoring-slot.entity';
import { Inject } from '@nestjs/common';
import { OrmEntityToDomainEntityMapper } from '@src/modules/shared/infrastructure/db/ormEntityToDomainEntityMapper.service';
import { SearchMentoringSlotsDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/search-mentoring-slots.dto.interface';

export default class MentoringSlotRepository extends Repository<MentoringSlotOrm> implements MentoringSlotRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,

    @Inject(OrmEntityToDomainEntityMapper)
    private readonly ormEntityToDomainEntityMapper: OrmEntityToDomainEntityMapper,
  ) {
    super(MentoringSlotOrm, datasource.createEntityManager());
  }

  async findMentoringSlotsByMissed(): Promise<MentoringSlot[]> {
    const query = this.createQueryBuilder('mentoringSlot');

    query.where('mentoringSlot.wasMissedByMentor = :wasMissedByMentor', { wasMissedByMentor: true });

    const mentoringSlotsOrm = await query.getMany();

    return this.mapMentoringSlotsOrmToMentoringSlots(mentoringSlotsOrm);
  }

  async searchMentoringSlots(searchFilters: SearchMentoringSlotsDtoInterface): Promise<MentoringSlot[]> {
    const query = this.createQueryBuilder('mentoringSlot');

    if (searchFilters) {
      if (searchFilters.date) {
        query.where('mentoringSlot.startDate <= :date', { date: searchFilters.date });
        query.andWhere('mentoringSlot.endDate >= :date', { date: searchFilters.date });
      }
    }

    const mentoringSlotsOrm = await query.getMany();

    return this.mapMentoringSlotsOrmToMentoringSlots(mentoringSlotsOrm);
  }

  async findMentoringSlotsBetweenDates(startDate: Date, endDate: Date): Promise<MentoringSlot[]> {
    const query = this.createQueryBuilder('mentoringSlot');

    query.andWhere(
      new Brackets((qb) => {
        qb.where('mentoringSlot.startDate BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        }).orWhere('mentoringSlot.endDate BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        });
      }),
    );

    const mentoringSlotsOrm = await query.getMany();

    return this.mapMentoringSlotsOrmToMentoringSlots(mentoringSlotsOrm);
  }

  async persist<MentoringSlot>(entityToBePersisted: DeepPartial<MentoringSlot>): Promise<MentoringSlot> {
    const mentoringSlotOrmToBePersisted = this.create(entityToBePersisted);
    const mentoringSlotPersisted = await this.save(mentoringSlotOrmToBePersisted);

    return (await this.findMentoringSlotById(mentoringSlotPersisted.id)) as unknown as MentoringSlot;
  }

  async findMentoringSlots(): Promise<MentoringSlot[]> {
    const query = this.createQueryBuilder('mentoringSlot');

    const mentoringSlotsOrm = await query.getMany();

    return this.mapMentoringSlotsOrmToMentoringSlots(mentoringSlotsOrm);
  }

  async findMentoringSlotBySlug(slug: string): Promise<MentoringSlot> {
    const query = this.createQueryBuilder('mentoringSlot');

    query.where('mentoringSlot.slug = :slug', { slug });

    const mentoringSlotOrm = await query.getOne();

    if (!mentoringSlotOrm) {
      return null;
    }

    return this.mapMentoringSlotOrmToMentoringSlot(mentoringSlotOrm);
  }

  async findMentoringSlotById(id: string): Promise<MentoringSlot> {
    const query = this.createQueryBuilder('mentoringSlot');

    query.where('mentoringSlot.id = :id', { id });

    const mentoringSlotOrm = await query.getOne();

    if (!mentoringSlotOrm) {
      return null;
    }

    return this.mapMentoringSlotOrmToMentoringSlot(mentoringSlotOrm);
  }

  private mapMentoringSlotOrmToMentoringSlot(mentoringSlotOrm: MentoringSlotOrm): MentoringSlot {
    const mentoringSlot = this.ormEntityToDomainEntityMapper.mapOrmEntityToDomainEntity<MentoringSlot>(
      mentoringSlotOrm,
      new MentoringSlot(),
    );

    return mentoringSlot;
  }

  private mapMentoringSlotsOrmToMentoringSlots(mentoringSlotsOrm: MentoringSlotOrm[]): MentoringSlot[] {
    return mentoringSlotsOrm.map((mentoringSlotOrm) => this.mapMentoringSlotOrmToMentoringSlot(mentoringSlotOrm));
  }
}
