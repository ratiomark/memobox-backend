import { APP_URL, API_PREFIX } from '../constants';

export const getFullUrl = () => {
  const app = APP_URL;
  const app_url_full = app + API_PREFIX;
  return app_url_full;
};
