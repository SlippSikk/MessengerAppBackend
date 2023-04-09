import request from 'sync-request';
import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;

export function requestNotificationsGet(token: string) {
  const res = request(
    'GET',
    SERVER_URL + '/notifications/get/v1',
    {
      headers: { token },
      timeout: 1000
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;

  return { body, statusCode };
}
