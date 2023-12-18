import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { commonShelfTemplate } from '@/common/const/commonShelfTemplate';
import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/common/const/flags';
import { CupboardObject } from '@/common/types/entities-types';
import {
  CupboardClass,
  UserDataStorageService,
} from '@/user-data-storage/user-data-storage.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CupboardFactory {
  constructor(
    private readonly moduleRef: ModuleRef,
    // private readonly userDataStorageService: UserDataStorageService,
  ) {}

  // async createCupboardForUser(userId: string): Promise<CupboardDataObject> {
  // const cupboardObject = this.moduleRef.get(UserDataStorageService, {
  //   strict: false,
  // });
  // await this.userDataStorageService.getCupboardObject(userId);
  // return cupboardObject;
  // }
}
