import { I18nContext, I18nService } from 'nestjs-i18n';

type TimeUnits = 'year' | 'month' | 'day' | 'hour' | 'minute';

export function timeLeft(utcTime: Date | null, i18nService: I18nService) {
  const lang = I18nContext.current()?.lang ?? 'en';
  if (!utcTime) return i18nService.translate('common.time.now', { lang });

  const currentTime = new Date().getTime();
  const diff = utcTime.getTime() - currentTime;
  if (diff < 0) return i18nService.translate('common.time.now', { lang });

  // Конвертируем разницу в секунды, минуты, часы, дни, месяцы и годы
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30); // Приблизительно
  const diffYears = Math.floor(diffMonths / 12);

  // Функция для интернационализации с учетом множественного числа
  const i18n = (number: number, unit: TimeUnits) => {
    return i18nService.translate(
      `common.time.${unit}${number > 1 ? '_plural' : ''}`,
      { lang, args: { count: number } },
    );
  };

  if (diffYears > 0) {
    return i18n(diffYears, 'year');
  } else if (diffMonths > 0) {
    return i18n(diffMonths, 'month');
  } else if (diffDays > 1) {
    return i18n(diffDays, 'day');
  } else if (diffHours > 0) {
    return i18n(diffHours, 'hour');
  } else if (diffMinutes > 0) {
    return i18n(diffMinutes, 'minute');
  } else {
    return i18nService.translate('time.less_than_minute', { lang });
  }
}
