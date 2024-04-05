function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getMonthData(year: number, month: number): void {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const daysOfWeek = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];
  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  console.log(`${monthNames[month]} ${year} года:`);

  const daysData: { [key: string]: number[] } = {};
  for (let i = 0; i < daysOfWeek.length; i++) {
    daysData[daysOfWeek[i]] = [];
  }

  let currentDay = 1;
  for (let i = 0; i < daysInMonth; i++) {
    const dayOfWeek = daysOfWeek[(firstDay + i) % 7];
    daysData[dayOfWeek].push(currentDay);
    currentDay++;
  }

  for (const dayOfWeek of daysOfWeek) {
    console.log(`${dayOfWeek} - ${daysData[dayOfWeek].join(', ')}`);
  }

  console.log('');
}

for (let year = 2024; year <= 2025; year++) {
  for (let month = 0; month < 12; month++) {
    getMonthData(year, month);
  }
}
