export const diffInMinutes = (date1, date2) => {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  const minutes = Math.ceil(diff / (1000 * 60));
  console.log(`Разница между датами составляет ${minutes} минут(ы).`);
};

export const diffInHours = (date1, date2) => {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  const hours = Math.ceil(diff / (1000 * 60 * 60));
  console.log(`Разница между датами составляет ${hours} час(ов).`);
};
export const diffInMonths = (date1, date2) => {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  const months = Math.ceil(diff / (1000 * 60 * 60 * 24));
  console.log(`Разница между датами составляет ${months} месяц(ев).`);
};

export const diffInFullTime = (date1, date2) => {
  const diff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());

  const months = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const hours = Math.ceil(diff / (1000 * 60 * 60));
  const minutes = Math.ceil((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.ceil((diff % (1000 * 60)) / 1000);

  console.log(
    `Разница между датами составляет ${months} месяц(ев) ${hours} час(ов), ${minutes} минут(ы) и ${seconds} секунд(ы).`,
  );
};
