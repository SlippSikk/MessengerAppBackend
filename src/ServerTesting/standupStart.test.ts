import { requestClear, requestAuthRegister, requestChannelsCreate, requestChannelJoin, requestChannelDetails } from "../wrappers";

function requestStandupStart(token: string, channelId: number, length: number) {
  const res = request(
    'POST',
    `${url}:${port}/standup/start/v1`,
    {
      json: {
        channelId,
        length,
      },
      headers : {
        token: token
      }
    }
  );

  return JSON.parse(res.getBody() as string);
}

describe("Valid operation", () => {
  let authId1: number;
  let authToken1: string;
  let authId2: number;
  let authToken2: string;
  let channelId1: number;
  let authId3: number;
  let authToken3: string;

  beforeEach(() => {
    requestClear();
    // note that authToken1 is the first Id and hence a global owner
    const globalOwner = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams');
    authId1 = globalOwner.authUserId;
    authToken1 = globalOwner.token;

    const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
    authId2 = user2.authUserId;
    authToken2 = user2.token;

    const user3 = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
    authId3 = user3.authUserId;
    authToken3 = user3.token;

    channelId1 = requestChannelsCreate(authToken2, "Channel 1", true).channelId;

    requestChannelJoin(authToken1, channelId1);
    requestChannelJoin(authToken3, channelId1);
  });

  test('No message sent', () => {
    requestStandupStart(authToken1, channelId1, 1);
  });
})

describe('Miscallaneous errors', () => {
    let authId1: number;
    let authToken1: string;
    let authId2: number;
    let authToken2: string;
    let channelId1: number;
    let authId3: number;
    let authToken3: string;
  
    beforeEach(() => {
      requestClear();
      // note that authToken1 is the first Id and hence a global owner
      const globalOwner = requestAuthRegister('anna@gmail.com', 'aaa123', 'Anna', 'Adams');
      authId1 = globalOwner.authUserId;
      authToken1 = globalOwner.token;

      const user2 = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums');
      authId2 = user2.authUserId;
      authToken2 = user2.token;
  
      const user3 = requestAuthRegister('chris@outlook.com', 'ccc123', 'Chris', 'Catman');
      authId3 = user3.authUserId;
      authToken3 = user3.token;

      channelId1 = requestChannelsCreate(authToken2, "Channel 1", true).channelId;

      requestChannelJoin(authToken1, channelId1);
      requestChannelJoin(authToken3, channelId1);
    });

    test('Invalid token', () => {
      expect(requestStandupStart(authToken1 + authToken2 + authToken3, channelId1, 2).error).toStrictEqual({message: expect.any(String)});
    });

    test('Invalid Channel Id', () => {
      expect(requestStandupStart(authToken3, channelId1 + 1, 2).error).toStrictEqual({message: expect.any(String)});
    });
  
    test('Negative length', () => {
      expect(requestStandupStart(authToken3, channelId1, -1).error).toStrictEqual({message: expect.any(String)});
    });

    test('Another standup is active', () => {
      const start = Date.now();
      requestStandupStart(authToken3, channelId1, 2);
      // if the standup is still active (takes 10 seconds)
      if (Math.floor((Date.now() - start)/1000) < 2) {
        expect(requestStandupStart(authToken3, channelId1, -1).error).toStrictEqual({message: expect.any(String)});
      }
    });

    test('channelId valid but user is not a member of channel', () => {
      const authToken4: string = requestAuthRegister('bob@outlook.com', 'bbb123', 'Bob', 'Biggums').token;
      expect(requestStandupStart(authToken4, channelId1, 10).error).toStrictEqual({message: expect.any(String)});
    });

  });
  