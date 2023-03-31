test('Test placeholder', () => {
  expect(1+1).toStrictEqual(2);
});

/*
import { requestChannelsCreate, requestClear, requestAuthRegister } from './../wrappers';

// test success cases
describe('channelsCreateV2 Success Test', () => {
  beforeEach(() => {
    requestClear();
  });

  test('Test 1', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    expect(requestChannelsCreate(token, 'chat', true)).toEqual({ channelId: expect.any(Number) });
  });

  test('Test 2', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    expect(requestChannelsCreate(token, 'chat123CHAT', true)).toEqual({ channelId: expect.any(Number) });
  });

  test('Test 3', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    expect(requestChannelsCreate(token, 'chat', false)).toEqual({ channelId: expect.any(Number) });
  });

  test('Test 4', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    expect(requestChannelsCreate(token, 'chat123CHAT', false)).toEqual({ channelId: expect.any(Number) });
  });

  test('Test 5', () => {
    const token2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').token;
    expect(requestChannelsCreate(token2, 'chat', true)).toEqual({ channelId: expect.any(Number) });
  });

  test('Test 6', () => {
    const token2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').token;
    expect(requestChannelsCreate(token2, 'chat123CHAT', true)).toEqual({ channelId: expect.any(Number) });
  });

  test('Test 7', () => {
    const token2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').token;
    expect(requestChannelsCreate(token2, 'chat', false)).toEqual({ channelId: expect.any(Number) });
  });

  test('Test 8', () => {
    const token2 = requestAuthRegister('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie').token;
    expect(requestChannelsCreate(token2, 'chat123CHAT', false)).toEqual({ channelId: expect.any(Number) });
  });
});

// test Error cases
describe('channelsCreateV2 Error Test', () => {
  beforeEach(() => {
    requestClear();
  });

  test('Test 1: Invalid name', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    expect(requestChannelsCreate(token, '', true)).toEqual({ error: expect.any(String) });
  });

  test('Test 2: Invalid name', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    expect(requestChannelsCreate(token, '', false)).toEqual({ error: expect.any(String) });
  });

  test('Test 3: Invalid name', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    expect(requestChannelsCreate(token, 'asdflaskdjfhakjhflkasjhdl', true)).toEqual({ error: expect.any(String) });
  });

  test('Test 4: Invalid name', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    expect(requestChannelsCreate(token, 'asdflaskdjfhakjhflkasjhdl', false)).toEqual({ error: expect.any(String) });
  });

  test('Test 5: Invalid userId', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    const invalidUserId = token + 1;
    expect(requestChannelsCreate(invalidUserId, '', true)).toEqual({ error: expect.any(String) });
  });

  test('Test 6: Invalid userId', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    const invalidUserId = token + 1;
    expect(requestChannelsCreate(invalidUserId, '', false)).toEqual({ error: expect.any(String) });
  });

  test('Test 7: Invalid userId', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    const invalidUserId = token + 1;
    expect(requestChannelsCreate(invalidUserId, 'asdflaskdjfhakjhflkasjhdl', true)).toEqual({ error: expect.any(String) });
  });

  test('Test 8: Invalid userId', () => {
    const token = requestAuthRegister('albert.kim@gmail.com', 'albert123', 'Albert', 'Kim').token;
    const invalidUserId = token + 1;
    expect(requestChannelsCreate(invalidUserId, 'asdflaskdjfhakjhflkasjhdl', false)).toEqual({ error: expect.any(String) });
  });
});
*/
