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
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/common/decorators';
import { Box, Card, Shelf, User } from '@prisma/client';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: Card['id'], @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
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
