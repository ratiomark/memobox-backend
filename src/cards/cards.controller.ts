import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import {
  MoveCardsDto,
  RemoveMultipleCardsDto,
  UpdateCardDto,
} from './dto/update-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, Lang } from '@/common/decorators';
import { Box, Card, Shelf, User } from '@prisma/client';
import { id } from 'date-fns/locale';

@ApiTags('Cards')
@Controller({
  path: 'cards',
  version: '1',
})
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(
    @GetCurrentUser('id') userId: User['id'],
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardsService.create(userId, createCardDto);
  }

  // @Get()
  // getCardsShelvesBoxesData(@GetCurrentUser('id') userId: User['id']) {
  //   return this.cardsService.getCardsShelvesBoxesData(userId);
  // }

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cardsService.findOne(+id);
  // }

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
