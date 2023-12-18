import { writeFile, appendFile } from 'fs';
import { join, resolve } from 'path';

export function appendTimeToFile(filePath, data) {
  const fullPath = resolve(filePath);
  const dataLine = `${data}\n`;

  appendFile(fullPath, dataLine, 'utf8', (err) => {
    if (err) {
      console.error('Ошибка при записи в файл:', err);
      return;
    }
  });
}
