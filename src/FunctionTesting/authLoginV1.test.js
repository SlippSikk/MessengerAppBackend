import { authRegisterV1, authLoginV1 } from './../auth.js'

// Registration:

beforeEach(() => {
    clearV1().then(() => {
        authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie');
    });
});

describe("Correct Login", () => {
    test('Correct Inputs', () => {
        const registered = authLoginV1('adam.baqaie@gmail.com', 'adam123')
        expect(registered).toEqual({ authUserId: 1 });
    });
});

describe("Incorrect Login", () => {
    test.each([
        { testName: 'incorrect email', email: 'albert.kim@gmail.com', password: 'adam123' },
        { testName: 'incorrect password', email: 'adam.baqaie@gmail.com', password: 'hello1' },
    ])('Input has $testName', ({ email, password }) => {
        expect(authLoginV1(email, password)).toBe({ error: 'error' });
    });
});



