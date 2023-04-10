import request from 'sync-request';
import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;

export function requestMessagePin(token: string, messageId: number) {
  const res = request(
    'POST',
    SERVER_URL + '/message/pin/v1',
    {
      headers: { token },
      json: {
        messageId
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;
  return { body, statusCode };
}

export function requestMessageUnpin(token: string, messageId: number) {
  const res = request(
    'POST',
    SERVER_URL + '/message/unpin/v1',
    {
      headers: { token },
      json: {
        messageId
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;
  return { body, statusCode };
}
