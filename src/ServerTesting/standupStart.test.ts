import { requestClear, requestAuthRegister, requestChannelsCreate, requestStandupStart, requestChannelJoin, requestChannelMessages } from '../wrappers';

const INPUT_ERROR = 400;
const AUTH_ERROR = 403;
const OK = 200;

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

describe('Miscallaneous errors', () => {
  let authToken1: string;
  let authToken2: string;
  let authToken3: string;
  let channelId1: number;

  beforeEach(() => {
    requestClear();
    authToken1 = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams').token;
    authToken2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').token;
    authToken3 = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman').token;

    channelId1 = requestChannelsCreate(authToken2, 'Channel 1', true).body.channelId;
    requestChannelJoin(authToken3, channelId1);
  });

  test('Invalid token', async() => {
    expect(requestStandupStart(authToken1 + authToken2 + authToken3, channelId1, 0.5).statusCode).toBe(AUTH_ERROR);
    await sleep(500);
  });

  test('Invalid channel Id', async() => {
    expect(requestStandupStart(authToken3, channelId1 + 1, 0.5).statusCode).toBe(INPUT_ERROR);
    await sleep(500);
  });

  test('Valid channel Id but user not a member', async() => {
    expect(requestStandupStart(authToken1, channelId1, 0.5).statusCode).toBe(AUTH_ERROR);
    await sleep(500);
  });

  test('Length is negative', async() => {
    expect(requestStandupStart(authToken3, channelId1, -1).statusCode).toBe(INPUT_ERROR);
    await sleep(500);
  });

  test('Another standup is active', async() => {
    expect(requestStandupStart(authToken3, channelId1, 1).statusCode).toBe(OK);
    expect(requestStandupStart(authToken2, channelId1, 0.5).statusCode).toBe(INPUT_ERROR);
    await sleep(1000);
  });
});

describe('Valid operation', () => {
  let authToken2: string;
  let channelId1: number;

  beforeEach(() => {
    requestClear();
    authToken2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').token;
    channelId1 = requestChannelsCreate(authToken2, 'Channel 1', true).body.channelId;
  });

  test('timeFinish is accurate', async() => {
    const standup = requestStandupStart(authToken2, channelId1, 0.5);
    const now: number = Math.floor((new Date()).getTime() / 1000);
    expect(standup.statusCode).toBe(OK);
    const expectedTime: number = standup.body.timeFinish;
    expect(expectedTime).toBeGreaterThanOrEqual(now);
    await sleep(500);
  });

  test('No message sent', async() => {
    expect(requestStandupStart(authToken2, channelId1, 0.5).statusCode).toBe(OK);
    await sleep(600);
    expect(requestChannelMessages(authToken2, channelId1, 0).body).toEqual({
      messages: [],
      start: 0,
      end: -1
    });
  });
});
