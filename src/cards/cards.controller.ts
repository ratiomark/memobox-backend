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
import { CardsTestService } from './services/cards-test.service';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import {
  MoveCardsBaseDto,
  MoveCardsDto,
  RemoveMultipleCardsDto,
  UpdateCardDto,
} from './dto/update-card.dto';
import { TrainingResponseDto } from './dto/update-cards-after-training.dto';
import { Lock } from '@/common/decorators/lock.decorator';
import { LOCK_KEYS } from '@/common/const/lock-keys-patterns';
import { BoxId, CardId, ShelfId, UserId } from '@/common/types/prisma-entities';

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
    @GetCurrentUser('id') userId: UserId,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardsService.create(userId, createCardDto);
  }

  // используется только для тестов
  @Post('drop')
  drop(@GetCurrentUser('id') userId: UserId) {
    return this.cardsService.drop(userId);
  }

  // @Lock(LOCK_KEYS.updateCardsAfterTraining)
  // @Post('training/answers/by-prisma')
  // updateCardsAfterTrainingPrisma(
  //   @GetCurrentUser('id') userId: UserId,
  //   @Body() body: TrainingResponseDto,
  // ) {
  //   return this.cardsService.updateCardsWithPrisma(userId, body);
  // }

  @Lock(LOCK_KEYS.updateCardsAfterTraining)
  @Post('training/answers')
  updateCardsAfterTraining(
    @GetCurrentUser('id') userId: UserId,
    @Body() body: TrainingResponseDto,
  ) {
    return this.cardsService.updateCardsAfterTraining(userId, body);
  }

  @Get('training/:shelfId/:boxId')
  findTrainingCardsByShelfIdAndBoxId(
    @GetCurrentUser('id') userId: UserId,
    @Param('shelfId') shelfId: ShelfId,
    @Param('boxId') boxId: BoxId,
  ) {
    return this.cardsService.findTrainingCardsByShelfIdAndBoxId(
      userId,
      shelfId,
      boxId,
    );
  }

  // only for tests
  @Get('test/get-by-shelfId-and-boxId/:shelfId/:boxId')
  getCardsByShelfIdAndBoxId(
    @GetCurrentUser('id') userId: UserId,
    @Param('shelfId') shelfId: ShelfId,
    @Param('boxId') boxId: BoxId,
  ) {
    return this.cardsTestService.getCardsByShelfIdAndBoxId(
      userId,
      shelfId,
      boxId,
    );
  }

  @Patch('restore-several-cards')
  restoreSeveralCards(
    @GetCurrentUser('id') userId: UserId,
    @Body() moveCardsDto: MoveCardsDto,
  ) {
    return this.cardsService.restoreSeveralCards(userId, moveCardsDto);
  }

  @Patch('restore/:cardId')
  restoreByCardId(
    @GetCurrentUser('id') userId: UserId,
    @Param('cardId') cardId: CardId,
    @Body() body: MoveCardsBaseDto,
  ) {
    return this.cardsService.restoreByCardId(
      userId,
      body.shelfId,
      body.boxId,
      cardId,
    );
  }

  // @Patch('restore-multiple-cards')
  // restoreByCardIdList(
  //   @GetCurrentUser('id') userId: UserId,
  //   @Body() body: { boxId: BoxId; shelfId: ShelfId; cardIds: CardId[] },
  // ) {
  //   return this.cardsService.restoreMultipleByCardIds(
  //     userId,
  //     body.shelfId,
  //     body.boxId,
  //     body.cardIds,
  //   );
  // }

  @Patch('move-cards')
  moveCards(
    @GetCurrentUser('id') userId: UserId,
    @Body() moveCardsDto: MoveCardsDto,
  ) {
    return this.cardsService.moveCards(userId, moveCardsDto);
  }

  @Patch(':id')
  update(
    @GetCurrentUser('id') userId: UserId,
    @Param('id') id: CardId,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(userId, id, updateCardDto);
  }

  @Delete('remove-cards')
  deleteSoftByCardIdList(
    @GetCurrentUser('id') userId: UserId,
    @Body() removeCardsDto: RemoveMultipleCardsDto,
  ) {
    return this.cardsService.deleteSoftByCardIdList(
      userId,
      removeCardsDto.cardIds,
    );
  }

  @Delete('remove-final-several-cards')
  deletePermanentlyByCardIdList(
    @GetCurrentUser('id') userId: UserId,
    @Body() removeCardsDto: RemoveMultipleCardsDto,
  ) {
    return this.cardsService.deletePermanentlyByCardIdList(
      userId,
      removeCardsDto.cardIds,
    );
  }

  @Delete('final/:id')
  deletePermanentlyByCardId(
    @GetCurrentUser('id') userId: UserId,
    @Param('id') cardId: CardId,
  ) {
    return this.cardsService.deletePermanentlyByCardId(userId, cardId);
  }

  @Delete(':id')
  deleteSoftByCardId(
    @GetCurrentUser('id') userId: UserId,
    @Param('id') id: CardId,
  ) {
    return this.cardsService.deleteSoftByCardId(userId, id);
  }
}
// @Controller({
//   path: 'cards',
//   version: '1',
// })
// export class CardsController {
//   constructor(private readonly cardsService: CardsService) {}

//   @Get()
//   getCardsShelvesBoxesData(@GetCurrentUser('id') userId: UserId) {
//     return this.cardsService.getCardsShelvesBoxesData(userId);
//   }

// }
