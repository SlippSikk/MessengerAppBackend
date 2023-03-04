import { authRegisterV1 } from './../auth.js'

describe("Correct Registration", () => {
    test('Correct Inputs', () => {
        const registered = authRegisterV1('adam.baqaie@gmail.com', 'adam123', 'Adam', 'Baqaie')
        expect(registered).toEqual({ authUserId: expect.any(Number) });
    });
});

describe("Incorrect Registration", () => {
    test.each([
        { testName: 'incorrect email', email: 'foo.bar@@gmail.c@m', password: 'hello123', nameFirst: 'Daniel', nameLast: 'Murphy' },
        { testName: 'in-use email', email: 'adam.baqaie@gmail.com', password: 'hello1', nameFirst: 'Daniel', nameLast: 'Murphy' },
        { testName: 'password < 6 char', email: 'foo.bar@foobar.com', password: 'hello', nameFirst: 'Daniel', nameLast: 'Murphy' },
        { testName: 'length of nameFirst < 1 || > 50', email: 'foo.bar@foobar.com', password: 'hello1', nameFirst: '', nameLast: 'Murphy' },
        { testName: 'length of nameLast < 1 || > 50', email: 'foo.bar@foobar.com', password: 'hello1', nameFirst: 'Daniel', nameLast: '' },
    ])('Input has $testName', ({ email, password, nameFirst, nameLast }) => {
        expect(authRegisterV1(email, password, nameFirst, nameLast)).toBe({ error: expect.any(String) });
    });
});


