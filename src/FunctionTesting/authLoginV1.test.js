import { authRegisterV1, authLoginV1 } from './../auth.js'
import { clearV1 } from './../'

// Registration:
beforeEach(() => {
    clearV1();
    authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie');
});

describe("Correct Login", () => {
    test('Correct Inputs', () => {
        const registered = authLoginV1('adam.baqaie@gmail.com', 'adam123')
        expect(registered).toEqual({ authUserId: expect.any(Number) });
    });
});

describe("Incorrect Login", () => {
    test.each([
        { testName: 'incorrect email', email: 'albert.kim@gmail.com', password: 'adam123' },
        { testName: 'incorrect password', email: 'adam.baqaie@gmail.com', password: 'hello1' },
    ])('Input has $testName', ({ email, password }) => {
        expect(authLoginV1(email, password)).toStrictEqual({ error: expect.any(String) });
    });

    test('No Users', () => {
        clearV1();
        expect(authLoginV1('adam.b@gmail.com', 'password')).toStrictEqual({ error: expect.any(String) });
    })
});



