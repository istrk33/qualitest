import { CreateMentoringSlotDtoInterface } from '@src/modules/mentoring-slot/domain/model/dto/create-mentoring-slot.dto.interface';

const mentoringSlotCreateDefaultData: CreateMentoringSlotDtoInterface = {
  startDate: '2023-10-22T10:00:00.000Z',
  endDate: '2023-10-22T12:00:00.000Z',
};

export const mentoringSlotBuilder = (mentoringSlotCreateData: CreateMentoringSlotDtoInterface = mentoringSlotCreateDefaultData) => {
  return {
    withStartDate: (startDate: CreateMentoringSlotDtoInterface['startDate']) => {
      return mentoringSlotBuilder({
        ...mentoringSlotCreateData,
        startDate,
      });
    },

    withEndDate: (endDate: CreateMentoringSlotDtoInterface['endDate']) => {
      return mentoringSlotBuilder({
        ...mentoringSlotCreateData,
        endDate,
      });
    },
    withWasMissed: (wasMissedByMentor: boolean) => {
      return mentoringSlotBuilder({
        ...mentoringSlotCreateData,
        wasMissedByMentor,
      }); 
    },

    build() {
      return mentoringSlotCreateData;
    },
  };
};
