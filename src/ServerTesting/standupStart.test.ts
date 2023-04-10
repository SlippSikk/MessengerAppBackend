import { requestClear, requestAuthRegister, requestChannelsCreate, requestStandupStart, requestChannelJoin, requestChannelMessages } from "../wrappers";

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
    let channelId1: number

    beforeEach(() => {
      requestClear();
      authToken1 = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams').token;
      authToken2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').token;
      authToken3 = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman').token;

      channelId1 = requestChannelsCreate(authToken2, 'Channel 1', true).body.channelId;
      requestChannelJoin(authToken3, channelId1);
    });

    test('Invalid token', () => {
      expect(requestStandupStart(authToken1 + authToken2 + authToken3, channelId1, 0.5).statusCode).toBe(AUTH_ERROR);
    })

    test('Invalid channel Id', () => {
      expect(requestStandupStart(authToken3, channelId1 + 1, 0.5).statusCode).toBe(INPUT_ERROR);
    })

    test('Valid channel Id but user not a member', () => {
      expect(requestStandupStart(authToken1, channelId1, 0.5).statusCode).toBe(AUTH_ERROR);
    })

    test('Length is negative', () => {
      expect(requestStandupStart(authToken3, channelId1, -1).statusCode).toBe(INPUT_ERROR);
    })

    test('Another standup is active', () => {
      expect(requestStandupStart(authToken3, channelId1, 1).statusCode).toBe(OK);
      expect(requestStandupStart(authToken2, channelId1, 0.5).statusCode).toBe(INPUT_ERROR);
    })

});

describe('Valid operation', () => {
  let authId2: number;
  let authToken2: string;
  let channelId1: number

  beforeEach(() => {
    requestClear();
    const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
    authId2 = user2.authUserId;
    authToken2 = user2.token;

    channelId1 = requestChannelsCreate(authToken2, 'Channel 1', true).body.channelId;
  });

  test('timeFinish is accurate', () => {
    const standup = requestStandupStart(authToken2, channelId1, 0.5);
    const now: number = Math.floor((new Date()).getTime() / 1000);
    expect(standup.statusCode).toBe(OK);
    const expectedTime: number = standup.body.timeFinish;
    expect(expectedTime).toBeGreaterThanOrEqual(now);
  })

  test('No message sent', async() => {
    expect(requestStandupStart(authToken2, channelId1, 0.5).statusCode).toBe(OK);
    await sleep(600);
    expect(requestChannelMessages(authToken2, channelId1, 0).body).toEqual({
      messages: [],
      start: 0,
      end: -1
    });
  })
});
