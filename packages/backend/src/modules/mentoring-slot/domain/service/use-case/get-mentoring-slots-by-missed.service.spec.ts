import { GetMentoringSlotsByMissedService } from '@src/modules/mentoring-slot/domain/service/use-case/get-mentoring-slots-by-missed.service';
import { MentoringSlotRepositoryInterface } from '../../port/db/mentoring-slot.repository.interface';

describe('get mentoring slots by missed only if the user is authenticated', () => {
  it('should return the mentoring slots by missed if the user is authenticated', async () => {
    const mentoringSlotsMissedMock = [
      {

      },
    ];

    const mentoringSlotRepositoryMock = {
      findMentoringSlotsByMissed: () => mentoringSlotsMissedMock,
    } as unknown as MentoringSlotRepositoryInterface

    const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMock);

    const returnValue = await getMentoringSlotsByMissedService.getMentoringSlotsByMissed(true);

    expect(returnValue).toEqual(mentoringSlotsMissedMock);
  });

  it('should throw an error if the user is not authenticated', async () => {
    const mentoringSlotsMissedMock = [
      {
        id: 1,
      },
    ];

    const mentoringSlotRepositoryMock = {
      findMentoringSlotsByMissed: () => mentoringSlotsMissedMock,
    };

    const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMock);

    await expect(getMentoringSlotsByMissedService.getMentoringSlotsByMissed(false)).rejects.toThrow();
  });
});
