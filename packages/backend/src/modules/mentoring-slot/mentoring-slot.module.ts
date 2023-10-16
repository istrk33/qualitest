import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import { CancelMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/cancel-mentoring-slot.service';
import { ConfirmMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/confirm-mentoring-slot.service';
import { CreateMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/create-mentoring-slot.service';
import { DelayMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/delay-mentoring-slot.service';
import { DeleteMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/delete-mentoring-slot.service';
import { DowngradeMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/downgrade-mentoring-slot.service';
import GetMentoringSlotBySlugService from '@src/modules/mentoring-slot/domain/service/use-case/get-mentoring-slot-by-slug.service';
import SearchMentoringSlotsService from '@src/modules/mentoring-slot/domain/service/use-case/search-mentoring-slots.service';
import { UpdateMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/update-mentoring-slot.service';
import MentoringSlotCreationDuplicateVerifierService from '@src/modules/mentoring-slot/domain/service/utils/mentoring-slot-creation-duplicate-verifier/mentoring-slot-creation-duplicate-verifier.service';
import MentoringSlotOrm from '@src/modules/mentoring-slot/infrastructure/db/entity/mentoring-slot.orm-entity';
import MentoringSlotRepository from '@src/modules/mentoring-slot/infrastructure/db/repository/mentoring-slot.repository';
import MentoringSlotController from '@src/modules/mentoring-slot/presentation/controller/mentoring-slot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MentoringSlotOrm])],
  controllers: [MentoringSlotController],
  providers: [
    {
      provide: 'MentoringSlotRepositoryInterface',
      useClass: MentoringSlotRepository,
    },
    {
      provide: MentoringSlotCreationDuplicateVerifierService,
      useFactory: (mentoringSlotRepository: MentoringSlotRepositoryInterface) => {
        return new MentoringSlotCreationDuplicateVerifierService(mentoringSlotRepository);
      },
      inject: ['MentoringSlotRepositoryInterface'],
    },
    {
      provide: CreateMentoringSlotService,
      useFactory: (
        mentoringSlotRepository: MentoringSlotRepositoryInterface,
        mentoringSlotCreationDuplicateVerifierService: MentoringSlotCreationDuplicateVerifierService,
      ) => {
        return new CreateMentoringSlotService(mentoringSlotRepository, mentoringSlotCreationDuplicateVerifierService);
      },
      inject: ['MentoringSlotRepositoryInterface', MentoringSlotCreationDuplicateVerifierService],
    },
    {
      provide: DeleteMentoringSlotService,
      useFactory: (mentoringSlotRepository: MentoringSlotRepositoryInterface) => {
        return new DeleteMentoringSlotService(mentoringSlotRepository);
      },
      inject: ['MentoringSlotRepositoryInterface'],
    },
    {
      provide: SearchMentoringSlotsService,
      useFactory: (mentoringSlotRepository: MentoringSlotRepositoryInterface) => {
        return new SearchMentoringSlotsService(mentoringSlotRepository);
      },
      inject: ['MentoringSlotRepositoryInterface'],
    },
    {
      provide: GetMentoringSlotBySlugService,
      useFactory: (mentoringSlotRepository: MentoringSlotRepositoryInterface) => {
        return new GetMentoringSlotBySlugService(mentoringSlotRepository);
      },
      inject: ['MentoringSlotRepositoryInterface'],
    },
    {
      provide: UpdateMentoringSlotService,
      useFactory: (
        mentoringSlotRepository: MentoringSlotRepositoryInterface,
        mentoringSlotCreationDuplicateVerifierService: MentoringSlotCreationDuplicateVerifierService,
      ) => {
        return new UpdateMentoringSlotService(mentoringSlotRepository, mentoringSlotCreationDuplicateVerifierService);
      },
      inject: ['MentoringSlotRepositoryInterface', MentoringSlotCreationDuplicateVerifierService],
    },
    {
      provide: CancelMentoringSlotService,
      useFactory: (mentoringSlotRepository: MentoringSlotRepositoryInterface) => {
        return new CancelMentoringSlotService(mentoringSlotRepository);
      },
      inject: ['MentoringSlotRepositoryInterface'],
    },
    {
      provide: ConfirmMentoringSlotService,
      useFactory: (mentoringSlotRepository: MentoringSlotRepositoryInterface) => {
        return new ConfirmMentoringSlotService(mentoringSlotRepository);
      },
      inject: ['MentoringSlotRepositoryInterface'],
    },
    {
      provide: DelayMentoringSlotService,
      useFactory: (mentoringSlotRepository: MentoringSlotRepositoryInterface) => {
        return new DelayMentoringSlotService(mentoringSlotRepository);
      },
      inject: ['MentoringSlotRepositoryInterface'],
    },
    {
      provide: DowngradeMentoringSlotService,
      useFactory: (mentoringSlotRepository: MentoringSlotRepositoryInterface) => {
        return new DowngradeMentoringSlotService(mentoringSlotRepository);
      },
      inject: ['MentoringSlotRepositoryInterface'],
    },
  ],
})
export default class MentoringSlotModule {}
