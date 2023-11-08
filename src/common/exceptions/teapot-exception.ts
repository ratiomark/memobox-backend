import { ImATeapotException } from '@nestjs/common';

export class TeapotException extends ImATeapotException {
  constructor() {
    super('Forbidden', {
      cause: 'Я так решил',
      description: 'Нет доступа к запрашиваемому ресурсу',
    });
  }
}
