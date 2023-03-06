import { clearV1 } from './../other.js';
import { channelsCreateV1 } from './../channels.js';
import { authRegisterV1 } from './../auth.js';

beforeEach(() => {
    clearV1();
    const authUserId = authRegisterV1("albert.kim@gmail.com", "albert123", "Albert", "Kim");
    const invalidUserId = authUserId + 1;
});


// test Success cases
describe('channelsCreateV1 Success Test', () => {

    test('Test 1', () => {
        expect(channelsCreateV1(authUserId, 'chat', true)).toEqual({ channelId: expect.any(Number) });
    });

    test('Test 2', () => {
        expect(channelsCreateV1(authUserId, 'chat123CHAT', true)).toEqual({ channelId: expect.any(Number) });
    });

    test('Test 3', () => {
        expect(channelsCreateV1(authUserId, 'chat', false)).toEqual({ channelId: expect.any(Number) });
    });

    test('Test 4', () => {
        expect(channelsCreateV1(authUserId, 'chat123CHAT', false)).toEqual({ channelId: expect.any(Number) });
    });

    test('Test 5', () => {
        authUserId_2 = authRegisterV1("adam.baqaie@gmail.com", "adam123", "Adam", "Baqaie");
        expect(channelsCreateV1(authUserId_2, 'chat', true)).toEqual({ channelId: expect.any(Number) });
    });

    test('Test 6', () => {
        authUserId_2 = authRegisterV1("adam.baqaie@gmail.com", "adam123", "Adam", "Baqaie");
        expect(channelsCreateV1(authUserId_2, 'chat123CHAT', true)).toEqual({ channelId: expect.any(Number) });
    });

    test('Test 7', () => {
        authUserId_2 = authRegisterV1("adam.baqaie@gmail.com", "adam123", "Adam", "Baqaie");
        expect(channelsCreateV1(authUserId_2, 'chat', false)).toEqual({ channelId: expect.any(Number) });
    });

    test('Test 8', () => {
        authUserId_2 = authRegisterV1("adam.baqaie@gmail.com", "adam123", "Adam", "Baqaie");
        expect(channelsCreateV1(authUserId_2, 'chat123CHAT', false)).toEqual({ channelId: expect.any(Number) });
    });

});

// test Error cases
describe('channelsCreateV1 Error Test', () => {

    test('Test 1: Invalid name', () => {
        expect(channelsCreateV1(authUserId, '', true)).toEqual({ error: expect.any(String) });
    });

    test('Test 2: Invalid name', () => {
        expect(channelsCreateV1(authUserId, '', false)).toEqual({ error: expect.any(String) });
    });

    test('Test 3: Invalid name', () => {
        expect(channelsCreateV1(authUserId, 'asdflaskdjfhakjhflkasjhdl', true)).toEqual({ error: expect.any(String) });
    });

    test('Test 4: Invalid name', () => {
        expect(channelsCreateV1(authUserId, 'asdflaskdjfhakjhflkasjhdl', false)).toEqual({ error: expect.any(String) });
    });

    test('Test 5: Invalid userId', () => {
        expect(channelsCreateV1(invalidUserId, '', true)).toEqual({ error: expect.any(String) });
    });

    test('Test 6: Invalid userId', () => {
        expect(channelsCreateV1(invalidUserId, '', false)).toEqual({ error: expect.any(String) });
    });

    test('Test 7: Invalid userId', () => {
        expect(channelsCreateV1(invalidUserId, 'asdflaskdjfhakjhflkasjhdl', true)).toEqual({ error: expect.any(String) });
    });

    test('Test 8: Invalid userId', () => {
        expect(channelsCreateV1(invalidUserId, 'asdflaskdjfhakjhflkasjhdl', false)).toEqual({ error: expect.any(String) });
    });

});