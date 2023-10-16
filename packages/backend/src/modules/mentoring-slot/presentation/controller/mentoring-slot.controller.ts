import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CancelMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/cancel-mentoring-slot.service';
import { CreateMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/create-mentoring-slot.service';
import { DeleteMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/delete-mentoring-slot.service';
import GetMentoringSlotBySlugService from '@src/modules/mentoring-slot/domain/service/use-case/get-mentoring-slot-by-slug.service';
import { UpdateMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/update-mentoring-slot.service';
import { CreateMentoringSlotDto } from '@src/modules/mentoring-slot/presentation/dto/create-mentoring-slot.dto';
import { UpdateMentoringSlotDto } from '@src/modules/mentoring-slot/presentation/dto/update-mentoring-slot.dto';
import { MentoringSlotPresenter } from '@src/modules/mentoring-slot/presentation/presenter/mentoring-slot.presenter';
import SearchMentoringSlotsService from '@src/modules/mentoring-slot/domain/service/use-case/search-mentoring-slots.service';
import { SearchMentoringSlotsDto } from '@src/modules/mentoring-slot/presentation/dto/search-mentoring-slots.dto';
import { ConfirmMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/confirm-mentoring-slot.service';
import { DelayMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/delay-mentoring-slot.service';
import { DowngradeMentoringSlotService } from '@src/modules/mentoring-slot/domain/service/use-case/downgrade-mentoring-slot.service';
import { DowngradeMentoringSlotDto } from '@src/modules/mentoring-slot/presentation/dto/downgrade-mentoring-slot.dto';

@Controller('/mentoring-slots')
export default class MentoringSlotController {
  constructor(
    private readonly createMentoringSlotService: CreateMentoringSlotService,
    private readonly searchMentoringSlotsService: SearchMentoringSlotsService,
    private readonly deleteMentoringSlotService: DeleteMentoringSlotService,
    private readonly getMentoringSlotBySlugService: GetMentoringSlotBySlugService,
    private readonly updateMentoringSlotService: UpdateMentoringSlotService,
    private readonly cancelMentoringSlotService: CancelMentoringSlotService,
    private readonly confirmMentoringSlotService: ConfirmMentoringSlotService,
    private readonly delayMentoringSlotService: DelayMentoringSlotService,
    private readonly downgradeMentoringSlotService: DowngradeMentoringSlotService,
  ) {}

  @Get()
  async searchMentoringSlots(@Query() searchMentoringSlotsDto: SearchMentoringSlotsDto): Promise<MentoringSlotPresenter[]> {
    const mentoringSlots = await this.searchMentoringSlotsService.searchMentoringSlots(searchMentoringSlotsDto);

    return mentoringSlots.map((mentoringSlot) => {
      return new MentoringSlotPresenter(mentoringSlot);
    });
  }

  @Get('/by-slug/:slug')
  async getMentoringSlotBySlug(@Param('slug') slug: string): Promise<MentoringSlotPresenter> {
    const mentoringSlot = await this.getMentoringSlotBySlugService.getMentoringSlotBySlug(slug);

    return new MentoringSlotPresenter(mentoringSlot);
  }

  @Delete('/:id')
  async deleteMentoringSlot(@Param('id') id: string): Promise<void> {
    return await this.deleteMentoringSlotService.deleteMentoringSlot(id);
  }

  @Post()
  async createMentoringSlot(@Body() createMentoringSlotDto: CreateMentoringSlotDto): Promise<MentoringSlotPresenter> {
    const mentoringSlot = await this.createMentoringSlotService.createMentoringSlot(createMentoringSlotDto);

    return new MentoringSlotPresenter(mentoringSlot);
  }

  @Patch('/:id')
  async updateMentoringSlot(
    @Param('id') id: string,
    @Body() updateMentoringSlotDto: UpdateMentoringSlotDto,
  ): Promise<MentoringSlotPresenter> {
    const mentoringSlot = await this.updateMentoringSlotService.updateMentoringSlot(id, updateMentoringSlotDto);

    return new MentoringSlotPresenter(mentoringSlot);
  }

  @Patch('/:id/downgrade')
  async downgradeMentoringSlot(
    @Param('id') id: string,
    @Body() downgradeMentoringSlotDto: DowngradeMentoringSlotDto,
  ): Promise<MentoringSlotPresenter> {
    const mentoringSlot = await this.downgradeMentoringSlotService.downgradeMentoringSlot(id, downgradeMentoringSlotDto);

    return new MentoringSlotPresenter(mentoringSlot);
  }

  @Patch('/:id/cancel')
  async cancelMentoringSlot(@Param('id') id: string): Promise<MentoringSlotPresenter> {
    const mentoringSlot = await this.cancelMentoringSlotService.cancelMentoringSlot(id);

    return new MentoringSlotPresenter(mentoringSlot);
  }

  @Patch('/:id/confirm')
  async confirmMentoringSlot(@Param('id') id: string): Promise<MentoringSlotPresenter> {
    const mentoringSlot = await this.confirmMentoringSlotService.confirmMentoringSlot(id);

    return new MentoringSlotPresenter(mentoringSlot);
  }

  @Patch('/:id/delay')
  async delayMentoringSlot(@Param('id') id: string): Promise<MentoringSlotPresenter> {
    const mentoringSlot = await this.delayMentoringSlotService.delayMentoringSlot(id);

    return new MentoringSlotPresenter(mentoringSlot);
  }
}
