import { MentoringSlotRepositoryInterface } from '@src/modules/mentoring-slot/domain/port/db/mentoring-slot.repository.interface';
import MentoringSlotCreationDuplicateVerifierService from '@src/modules/mentoring-slot/domain/service/utils/mentoring-slot-creation-duplicate-verifier/mentoring-slot-creation-duplicate-verifier.service';
import {
  createMentoringSlotInput,
  mentoringSlots,
} from '@src/modules/mentoring-slot/domain/service/utils/mentoring-slot-creation-duplicate-verifier/mentoring-slot-creation-duplicate-verifier.fixture';
import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';

describe('verify mentoring slot duplicate on creation', () => {
  let mentoringSlotRepositoryMock: MentoringSlotRepositoryInterface;

  beforeAll(() => {
    mentoringSlotRepositoryMock = {
      findMentoringSlotsBetweenDates: () => [],
    } as unknown as MentoringSlotRepositoryInterface;
  });

  it('should return an exception if there is already a mentoring slot starting or ending between the start date and the end date of the new mentoring slot', async () => {
    const mentoringSlotRepositoryMockImpl = {
      ...mentoringSlotRepositoryMock,
      findMentoringSlotsBetweenDates: () => mentoringSlots,
    } as unknown as MentoringSlotRepositoryInterface;

    const mentoringSlotCreationValidatorService = new MentoringSlotCreationDuplicateVerifierService(mentoringSlotRepositoryMockImpl);

    expect(() => mentoringSlotCreationValidatorService.verifyDuplicates(createMentoringSlotInput)).rejects.toThrow(Exception);
  });

  it('should not return an exception if there is no mentoring slot starting or ending between the starts date and the ends date of the new mentoring slot ', async () => {
    const mentoringSlotCreationValidatorService = new MentoringSlotCreationDuplicateVerifierService(mentoringSlotRepositoryMock);

    await expect(mentoringSlotCreationValidatorService.verifyDuplicates(createMentoringSlotInput)).resolves.not.toThrow(Exception);
  });
});
