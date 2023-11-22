import { addMinutes, addHours, addDays, addWeeks, addMonths } from 'date-fns';
import { TimingBlock } from '@/aggregate/entities/settings-types';

// export function calculateNextTraining(timing: TimingBlock) {
//   let nextTraining = new Date(); // Текущее время
//   console.log(nextTraining, new Date());
//   console.log(JSON.stringify(timing));
//   // Добавляем интервалы из TimingBlock
//   nextTraining = addMinutes(nextTraining, timing.minutes);
//   nextTraining = addHours(nextTraining, timing.hours);
//   nextTraining = addDays(nextTraining, timing.days);
//   nextTraining = addWeeks(nextTraining, timing.weeks);
//   nextTraining = addMonths(nextTraining, timing.months);

//   console.log(nextTraining, new Date());
//   return nextTraining;
// }
export function calculateNextTraining(timing: TimingBlock) {
  let nextTraining = new Date(); // Текущее время
  // Добавляем интервалы из TimingBlock
  nextTraining = addMinutes(nextTraining, timing.minutes);
  nextTraining = addHours(nextTraining, timing.hours);
  nextTraining = addDays(nextTraining, timing.days);
  nextTraining = addWeeks(nextTraining, timing.weeks);
  nextTraining = addMonths(nextTraining, timing.months);

  return nextTraining;
}

// // Пример использования
// const timingBlock = {
//   minutes: 30,
//   hours: 2,
//   days: 1,
//   weeks: 0,
//   months: 0,
// };

// const nextTrainingTime = calculateNextTraining(timingBlock);
// console.log(nextTrainingTime); // Выводит время следующей тренировки
