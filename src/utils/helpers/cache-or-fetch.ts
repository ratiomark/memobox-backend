export async function cacheOrFetchData<T>(
  key: string,
  getRedisData: (key: string) => Promise<T | null>,
  getDbData: (key: string) => Promise<T>,
  saveRedisData: (key: string, data: T) => Promise<void>,
): Promise<T> {
  const redisData = await getRedisData(key);
  if (redisData) {
    return redisData;
  }

  const dbData = await getDbData(key);
  await saveRedisData(key, dbData);
  return dbData;
}
