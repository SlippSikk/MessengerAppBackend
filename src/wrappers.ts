import request from 'sync-request';
import config from './config.json';
import { authUserId } from './interfaces';

const port = config.port;
const url = config.url;
// import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;

function requestAuthRegister(email: string, password: string, nameFirst: string, nameLast: string): authUserId {
  const res = request(
    'POST',
    `${url}:${port}/auth/register/v2`,
    {
      json: {
        email,
        password,
        nameFirst,
        nameLast
      }
    }
  );

  return JSON.parse(res.getBody() as string);
}

function requestAuthLogin(email: string, password: string): authUserId {
  const res = request(
    'POST',
    `${url}:${port}/auth/login/v2`,
    {
      json: {
        email,
        password
      }
    }
  );

  return JSON.parse(res.getBody() as string);
}

function requestClear() {
  const res = request(
    'DELETE',
    `${url}:${port}/clear/v1`,
    {

    }
  );

  return JSON.parse(res.getBody() as string);
}

export function requestAddowner(token: string, channelId: number, uId: number) {
  const res = request(
    'POST',
    SERVER_URL + '/channel/addowner/v1',
    {
      json: {
        token: token,
        channelId: channelId,
        uId: uId
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}

export function requestChannelLeave(token: string, channelId: number) {
  const res = request(
    'POST',
    SERVER_URL + '/channel/leave/v1',
    {
      json: {
        token: token,
        channelId: channelId,
      }
    }
  );
  return JSON.parse(res.getBody() as string);
};

export { requestAuthRegister, requestAuthLogin, requestClear };
