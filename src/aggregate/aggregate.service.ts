// import { Injectable } from '@nestjs/common';
// import { CreateAggregateDto } from './dto/create-aggregate.dto';
// import { UpdateAggregateDto } from './dto/update-aggregate.dto';
// import { CardsService } from 'src/cards/cards.service';
// import { ShelvesService } from 'src/shelves/shelves.service';
// import { User } from '@prisma/client';

// @Injectable()
// export class AggregateService {
//   constructor(
//     private readonly cardsService: CardsService,
//     private readonly shelvesService: ShelvesService,
//   ) {}
//   // create(createAggregateDto: CreateAggregateDto) {
//   //   return 'This action adds a new aggregate';
//   // }
//   // async getViewPageData(userId: User['id']) {
//   //   const [cards, shelvesAndBoxesData] = await Promise.all([
//   //     this.cardsService.findAllWithBox(userId),
//   //     this.shelvesService.getShelvesAndBoxesData(userId),
//   //   ]);
//   //   const enhancedCards = cards.map((card) => {
//   //     let state = 'wait'; // Значение по умолчанию

//   //     if (card.nextTraining) {
//   //       const nextTrainingDate = new Date(card.nextTraining);
//   //       const now = new Date();

//   //       // Если nextTraining больше текущего времени, то карточка в состоянии 'train'
//   //       if (nextTrainingDate > now) {
//   //         state = 'train';
//   //       }
//   //     }

//   //     const boxIndex = card.box.index;
//   //     let specialType = 'none';
//   //     switch (boxIndex) {
//   //       case 0:
//   //         specialType = 'new';
//   //         break;
//   //       case shelvesAndBoxesData[card.shelfId].maxIndexBox:
//   //         specialType = 'learnt';
//   //         break;
//   //     }

//   //     return {
//   //       ...card,
//   //       boxIndex,
//   //       specialType,
//   //       state,
//   //     };
//   //   });
//   //   return { cards: enhancedCards, shelvesAndBoxesData };
//   // }

//   // findAll() {
//   //   return `This action returns all aggregate`;
//   // }

//   // findOne(id: number) {
//   //   return `This action returns a #${id} aggregate`;
//   // }

//   // update(id: number, updateAggregateDto: UpdateAggregateDto) {
//   //   return `This action updates a #${id} aggregate`;
//   // }

//   // remove(id: number) {
//   //   return `This action removes a #${id} aggregate`;
//   // }
// }
