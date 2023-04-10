
import { requestClear, requestAuthRegister, requestChannelsCreate, requestStandupStart, requestStandupActive, requestChannelJoin } from '../wrappers';

const INPUT_ERROR = 400;
const AUTH_ERROR = 403;

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

  test('Invalid token', () => {
    requestStandupStart(authToken2, channelId1, 1);
    expect(requestStandupActive(authToken1 + authToken2 + authToken3, channelId1).statusCode).toBe(AUTH_ERROR);
  });

  test('Invalid channel Id', () => {
    requestStandupStart(authToken2, channelId1, 1);
    expect(requestStandupActive(authToken3, channelId1 + 1).statusCode).toBe(INPUT_ERROR);
  });

  test('Valid channel Id but user not a member', () => {
    requestStandupStart(authToken2, channelId1, 1);
    expect(requestStandupActive(authToken1, channelId1).statusCode).toBe(AUTH_ERROR);
  });
});

describe('Regular operation', () => {
  let authToken1: string;
  let channelId1: number;

  beforeEach(() => {
    requestClear();
    authToken1 = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams').token;
    channelId1 = requestChannelsCreate(authToken1, 'Channel 1', true).body.channelId;
  });

  test('No standup active', () => {
    expect(requestStandupActive(authToken1, channelId1).body).toStrictEqual({
      isActive: false,
      timeFinish: null
    });
  });

  test('Standup active', () => {
    const timeFinish: number = requestStandupStart(authToken1, channelId1, 0.5).body.timeFinish;
    expect(requestStandupActive(authToken1, channelId1).body).toStrictEqual({
      isActive: true,
      timeFinish: timeFinish
    });
  });
});
