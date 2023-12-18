import { GetCurrentUser } from '@/common/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  forwardRef,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Box, Card, Shelf, User } from '@prisma/client';
import { CardsTestService } from './services/cards-test.service';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import {
  MoveCardsDto,
  RemoveMultipleCardsDto,
  UpdateCardDto,
} from './dto/update-card.dto';
import { TrainingResponseDto } from './dto/update-cards-after-training.dto';
import { Lock } from '@/common/decorators/lock.decorator';
import { LOCK_KEYS } from '@/common/const/lock-keys-patterns';

@ApiTags('Cards')
@Controller({
  path: 'cards',
  version: '1',
})
export class CardsController {
  constructor(
    @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
    private readonly cardsTestService: CardsTestService,
  ) {}

  @Post()
  create(
    @GetCurrentUser('id') userId: User['id'],
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardsService.create(userId, createCardDto);
  }

  @Post('drop')
  drop(@GetCurrentUser('id') userId: User['id']) {
    return this.cardsService.drop(userId);
  }

  // @Get()
  // getCardsShelvesBoxesData(@GetCurrentUser('id') userId: User['id']) {
  //   return this.cardsService.getCardsShelvesBoxesData(userId);
  // }
  @Lock(LOCK_KEYS.updateCardsAfterTraining)
  @Post('training/answers/by-prisma')
  updateCardsAfterTrainingPrisma(
    @GetCurrentUser('id') userId: User['id'],
    @Body() body: any,
    // @Body() body: TrainingResponseDto,
  ) {
    return this.cardsService.updateCardsWithPrisma(userId, body);
  }

  @Lock(LOCK_KEYS.updateCardsAfterTraining)
  @Post('training/answers')
  updateCardsAfterTraining(
    @GetCurrentUser('id') userId: User['id'],
    @Body() body: any,
    // @Body() body: TrainingResponseDto,
  ) {
    return this.cardsService.updateCardsAfterTraining(userId, body);
  }

  @Get('training/:shelfId/:boxId')
  findTrainingCardsByShelfIdAndBoxId(
    @GetCurrentUser('id') userId: User['id'],
    @Param('shelfId') shelfId: Shelf['id'],
    @Param('boxId') boxId: Box['id'],
  ) {
    return this.cardsService.findTrainingCardsByShelfIdAndBoxId(
      userId,
      shelfId,
      boxId,
    );
  }

  // test
  @Get('get-cards-from-new-box')
  getCardsFromNewBox(@GetCurrentUser('id') userId: User['id']) {
    return this.cardsTestService.getCardsFromNewBox(userId);
  }

  @Get('get-by-shelfId-and-boxId/:shelfId/:boxId')
  getCardsByShelfIdAndBoxId(
    @GetCurrentUser('id') userId: User['id'],
    @Param('shelfId') shelfId: Shelf['id'],
    @Param('boxId') boxId: Box['id'],
  ) {
    return this.cardsTestService.getCardsByShelfIdAndBoxId(
      userId,
      shelfId,
      boxId,
    );
  }

  @Patch('move-cards')
  moveCards(@Body() moveCardsDto: MoveCardsDto) {
    console.log(moveCardsDto);
    return this.cardsService.moveCards(moveCardsDto);
  }

  @Patch(':id')
  update(@Param('id') id: Card['id'], @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete('remove-cards')
  deleteSoftByCardIdList(@Body() removeCardsDto: RemoveMultipleCardsDto) {
    return this.cardsService.deleteSoftByCardIdList(removeCardsDto.cardIds);
  }

  @Delete(':id')
  deleteSoftByCardId(@Param('id') id: Card['id']) {
    return this.cardsService.deleteSoftByCardId(id);
  }
}
// @Controller({
//   path: 'cards',
//   version: '1',
// })
// export class CardsController {
//   constructor(private readonly cardsService: CardsService) {}

//   @Get()
//   getCardsShelvesBoxesData(@GetCurrentUser('id') userId: User['id']) {
//     return this.cardsService.getCardsShelvesBoxesData(userId);
//   }

// }
