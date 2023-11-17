import { BoxSpecialType } from '@prisma/client';

export function getSpecialType(
  boxIndex: number,
  countBoxes: number,
): BoxSpecialType {
  if (boxIndex === 0) {
    return BoxSpecialType.new;
  } else if (boxIndex === countBoxes - 1) {
    return BoxSpecialType.learnt;
  }
  return BoxSpecialType.none;
  // let specialType: BoxSpecialType = BoxSpecialType.none;
  // if (boxIndex === 0) {
  //   specialType = BoxSpecialType.new;
  // } else if (boxIndex === countBoxes - 1) {
  //   specialType = BoxSpecialType.new;
  // }
  // return specialType;
}
