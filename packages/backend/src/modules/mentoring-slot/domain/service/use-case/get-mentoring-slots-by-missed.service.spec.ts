import { GetMentoringSlotsByMissedService } from "./get-mentoring-slots-by-missed.service";

describe('get mentoring slots by missed only if the user is authentificated', () => {

    beforeAll(() => {

      });


    it('should return the mentoring slot by missed if the user is auth', async () => {

        const mentoringSlotMissedMock = [
            {
                id:1,
            },
        ];

        const mentoringSlotRepositoryMock = {
            findMentoringSlotsByMissed: () => mentoringSlotMissedMock
          };

        const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMock);
        const mentoringSlot = await getMentoringSlotsByMissedService.getMentoringSlotsByMissed(true);

        expect(mentoringSlot).toEqual(mentoringSlotMissedMock);
      });

      //test avec user auth à false
      // le service devrait retourner une erreur

      //instance le service avec le mock du repository
      //appelle la méthode getMentoringSlotsByMissed avec un user auth à false
      // je vérifie que le service a bien levé une erreur

      it('should return an error if the user is not auth', async () => {

        const mentoringSlotMissedMock = [
            {
                id:1,
            },
        ];

        const mentoringSlotRepositoryMock = {
            findMentoringSlotsByMissed: () => mentoringSlotMissedMock
          };

          const getMentoringSlotsByMissedService = new GetMentoringSlotsByMissedService(mentoringSlotRepositoryMock);
          await expect(getMentoringSlotsByMissedService.getMentoringSlotsByMissed(false)).rejects.toThrow('User is not authenticated');

      });

});