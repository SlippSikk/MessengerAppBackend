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

export function requestMessageShare(token: string, ogMessageId: number, message: string, channelId: number, dmId: number) {
  const res = request(
    'POST',
    SERVER_URL + 'message/share/v1',
    {
      headers: { token },
      json: {
        ogMessageId,
        message,
        channelId,
        dmId
      }
    }
  );
  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;
  return { body, statusCode };
}

export function requestMessageReact(token: string, messageId: number, reactId: number) {
  const res = request(
    'POST',
    SERVER_URL + '/message/react/v1',
    {
      headers: { token },
      json: {
        messageId,
        reactId
      }
    }
  );

  const body = JSON.parse(res.body as string);
  const statusCode = res.statusCode;
  return { body, statusCode };
}
