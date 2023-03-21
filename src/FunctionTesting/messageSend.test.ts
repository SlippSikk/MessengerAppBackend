import request from 'sync-request';

import { port, url } from './config.json';
const SERVER_URL = `${url}:${port}`;
const ERROR = { error: expect.any(String) };


function requestPostCreate(token: string, channelId: number, message: string) {
  const res = request(
    'POST',
    SERVER_URL + '/message/send/v1',
    {
      json: {
        token: token,
        channelId: channelId,
        message: message
      }
    }
  );
  return JSON.parse(res.getBody() as string);
}


describe('Error Cases', () => {
  beforeEach(() => {
    
  });
  test('Invalid postId', () => {
    expect(requestPostView(currPostId + 1)).toStrictEqual(ERROR);
  });
  test('Post with no comments', () => {
   
  });

  test('Full Posts and more than 1 comment', () => {
    
    });
});