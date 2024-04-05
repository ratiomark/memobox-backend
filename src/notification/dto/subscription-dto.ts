import { IsArray, IsObject, IsString } from 'class-validator';
import { PushSubscription } from 'web-push';

export interface SubscriptionBaseDTO {
  subscription: PushSubscription;
  browserName: string;
  osName: string;
}

export class SubscriptionDTO {
  @IsObject()
  subscription: PushSubscription;

  @IsString()
  browserName: string;

  @IsString()
  osName: string;
}
