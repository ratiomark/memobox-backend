import { IsArray, IsString } from 'class-validator';
import { BoxId, CardId, ShelfId } from '@/common/types/prisma-entities';
import { ClientResponse } from '@sendgrid/mail';
type language = 'en' | 'ru';

process.env.TZ = 'Etc/UTC';

interface ResponseBaseDTO {
  language: language;
  success: boolean;
  notificationIds: string[];
  statusCode: number;
  message: string;
}

interface SuccessResponseDTO extends ResponseBaseDTO {
  success: true;
  response: ClientResponse;
}

interface SuccessResponseNoNotificationsDTO extends ResponseBaseDTO {
  success: true;
  response: null;
}

interface ErrorResponseDTO {
  language: language;
  success: false;
  notificationIds: string[];
  message: string;
}

export type ResponseDTO =
  | SuccessResponseDTO
  | ErrorResponseDTO
  | SuccessResponseNoNotificationsDTO;
// export class UpdateCardDto extends PartialType(CreateCardDto) {

//   @Exclude({ toClassOnly: true })
//   box: any;

//   nextTraining: Date | null | string;

//   @Expose({ name: 'boxIndex' })
//   @Transform(({ obj }) => obj.box?.index, { toClassOnly: true })
//   boxIndex: number;

//   @Expose({ name: 'specialType' })
//   @Transform(({ obj }) => obj.box?.specialType, { toClassOnly: true })
//   specialType: string;

//   @Transform(({ value }) => (value ? value : '---'), { toClassOnly: true })
//   lastTraining: Date | string;

//   state: 'wait' | 'train';

//   isDeleting: false;
// }
// @Expose({ name: 'cardIds' })
export class MoveCardsBaseDto {
  @IsString()
  shelfId: ShelfId;

  @IsString()
  boxId: BoxId;
}

export class MoveCardsDto extends MoveCardsBaseDto {
  @IsArray()
  cardIds: CardId[];
}

export class MoveOneCardDto extends MoveCardsBaseDto {
  @IsString()
  cardId: CardId; // Добавляем новое поле
}
// export class RestoreCardsDto = MoveCardsDto

export class RemoveMultipleCardsDto {
  @IsArray()
  cardIds: CardId[];
}

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
