import { SetMetadata } from '@nestjs/common';
import { META_KEY_IS_PUBLIC } from '@/common/const/metadata';

export const IsPublic = () => SetMetadata(META_KEY_IS_PUBLIC, true);
