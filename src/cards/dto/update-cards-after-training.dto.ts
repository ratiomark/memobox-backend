// AnswerType;
import { PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './create-card.dto';
import { Expose, Transform, Exclude } from 'class-transformer';
import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';
import { Box, BoxSpecialType, Card, Shelf } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { timeLeft } from '../helpers/timeLeft';

import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

// class TrainingCardResponse {
//   @IsEnum(TrainingResponse)
//   answer: TrainingResponse;

//   @ValidateNested()
//   @Type(() => CardDetails)
//   card: CardDetails;
// }

// export class TrainingResponseDto {
//   [cardId: string]: TrainingCardResponse;
// }
enum TrainingResponse {
  GOOD = 'good',
  MIDDLE = 'middle',
  BAD = 'bad',
}

class CardDetails {
  @IsString()
  id: string;

  nextTraining: Date | null | string;

  @IsString()
  userId: string;

  @IsString()
  shelfId: string;

  @IsString()
  boxId: string;

  @IsNumber()
  boxIndex: number;

  @IsString()
  specialType: string;

  @IsString()
  state: string;

  @IsEnum(TrainingResponse)
  answer: TrainingResponse;
}

// class TrainingCardResponse {
//   @IsEnum(TrainingResponse)
//   answer: TrainingResponse;

//   @ValidateNested()
//   @Type(() => CardDetails)
//   card: CardDetails;
// }

export class TrainingResponseDto {
  @ValidateNested({ each: true })
  @Type(() => CardDetails)
  responses: CardDetails[];

  // getCardIds() {
  //   return this.responses.map((response) => response.id);
  // }
}
// [cardId: string]: TrainingCardResponse;
// export class TrainingBodyDto {
//   // constructor(partial: Partial<CreateCardDto>) {
//   //   super(partial); // Вызов конструктора родительского класса
//   // }

//   calculateState() {
//     if (this.specialType === BoxSpecialType.new && NEW_CARDS_COUNTS_AS_TRAIN) {
//       this.state = 'train';
//     } else if (this.nextTraining && this.nextTraining < new Date()) {
//       this.state = 'train';
//     } else {
//       this.state = 'wait';
//     }
//   }

//   updateNextTraining(i18nService: I18nService) {
//     this.nextTraining = timeLeft(this.nextTraining as Date, i18nService);
//   }

//   nextTraining: Date | null | string;

//   @IsString()
//   userId: string;

//   @IsString()
//   shelfId: string;

//   @IsString()
//   boxId: string;

//   @IsNumber()
//   boxIndex: number;

//   @Expose({ name: 'specialType' })
//   @Transform(({ obj }) => obj.box?.specialType, { toClassOnly: true })
//   specialType: string;

//   @Transform(({ value }) => (value ? value : '---'), { toClassOnly: true })
//   lastTraining: Date | string;

//   state: 'wait' | 'train';

//   isDeleting: false;
// }

// export class MoveCardsDto {
//   // @Expose({ name: 'cardIds' })
//   @IsArray()
//   cardIds: Card['id'][];

//   @IsString()
//   shelfId: Shelf['id'];

//   @IsString()
//   boxId: Box['id'];
// }

// export class RemoveMultipleCardsDto {
//   @IsArray()
//   cardIds: Card['id'][];
// }

// const getCardState = (card: UpdateCardDto): 'wait' | 'train' => {
//   // let state: 'wait' | 'train' = 'wait'; // Значение по умолчанию
//   if (card.specialType === BoxSpecialType.new && NEW_CARDS_COUNTS_AS_TRAIN) {
//     // state = 'train';
//     return 'train';
//   } else if (card.nextTraining && card.nextTraining < new Date()) {
//     // state = 'train';
//     return 'train';
//   }
//   return 'wait';
// };
// import { PartialType } from '@nestjs/swagger';
// import { CreateCardDto } from './create-card.dto';
// import { Expose, Transform, Exclude } from 'class-transformer';
// import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';
// import { BoxSpecialType } from '@prisma/client';
// import { UpdateCardDbResponse } from '../entities/card.entity';

// export class UpdateCardDto extends PartialType(CreateCardDto) {
//   @Exclude({ toClassOnly: true })
//   box;

//   nextTraining: Date | null;

//   @Expose({ name: 'boxIndex' })
//   @Transform(({ obj }) => obj.box?.index, { toClassOnly: true })
//   boxIndex: number;

//   @Expose({ name: 'specialType' })
//   @Transform(({ obj }) => obj.box?.specialType, { toClassOnly: true })
//   specialType: string;

//   @Expose({ name: 'stateNOtCool' })
//   get stateCool(): 'wait' | 'train' {
//     return getCardState(this);
//   }
// }

// const getCardState = (card: UpdateCardDto): 'wait' | 'train' => {
//   // let state: 'wait' | 'train' = 'wait'; // Значение по умолчанию
//   if (card.specialType === BoxSpecialType.new && NEW_CARDS_COUNTS_AS_TRAIN) {
//     // state = 'train';
//     return 'train';
//   } else if (card.nextTraining && card.nextTraining < new Date()) {
//     // state = 'train';
//     return 'train';
//   }
//   return 'wait';
// };
