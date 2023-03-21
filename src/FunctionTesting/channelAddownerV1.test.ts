import request from 'sync-request';

import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;
const ERROR = { error: expect.any(String) };

export const requestChannelAddowner = (token : string, channelId : number, uId: number): duck =>  {
  const res = request(
    'POST',
    SERVER_URL + '/channel/addowner/v1',
    {
      json: {
        token: token,
        channelId: channelId,
        uId: uId,
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}



describe('Error Cases', () => {
  beforeEach(() => {

  });
  test('Invalid channelId', () => {
    
    expect().toStrictEqual(ERROR);
  });
  test('Invalid uId', () => {

    expect().toStrictEqual(ERROR);
  });
  test('uId is not a member of channelId', () => {

    expect().toStrictEqual(ERROR);
  });
  test('uId is already owner', () => {

    expect().toStrictEqual(ERROR);
  });
  test('uId does not have owner permissions', () => {

    expect().toStrictEqual(ERROR);
  });
  test('invalid token', () => {

    expect().toStrictEqual(ERROR);
  });
  
});

describe('Error Cases', () => {
})

