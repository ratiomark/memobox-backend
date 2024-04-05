export const convertUTCToLocalTime = (date: Date, timeZone: string): Date => {
  const dateString = date.toLocaleString('en-US', { timeZone: timeZone });
  return new Date(dateString);
};
