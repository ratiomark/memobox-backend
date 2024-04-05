import { TimingBlock } from '@/common/types/frontend/types';

export const updateObjectIfAllZeros = (obj: TimingBlock) => {
  // Проверяем, равны ли все поля объекта нулю
  const allZeros = Object.values(obj).every((value) => value === 0);

  // Если все поля равны нулю, возвращаем новый объект с minutes равным 1
  if (allZeros) {
    return { ...obj, minutes: 1 };
  }

  // В противном случае возвращаем исходный объект
  return obj;
};
