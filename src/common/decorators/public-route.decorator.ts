import { SetMetadata } from '@nestjs/common';
import { META_KEY_IS_PUBLIC } from 'src/common/const/metadata';

export const IsPublic = () => SetMetadata(META_KEY_IS_PUBLIC, true);
