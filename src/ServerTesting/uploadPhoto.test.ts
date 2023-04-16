import { requestAuthRegister, requestClear } from '../wrappers';
import { requestUploadPhoto } from '../XujiWrap';

let imgUrl: string;
let xStart: number;
let yStart: number;
let xEnd: number;
let yEnd: number;
const jpgImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG/330px-Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG'
beforeEach(() => {
    // requestClear();
});
  
describe('uploadPhoto', () => {
  test('return 200 status code,return value is {}', () => {
    requestClear();
    const tokenA = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash').token;
    const token = tokenA;
    const imgUrl = jpgImage;
    const xStart = 50;
    const yStart = 0;
    const xEnd = 300;
    const yEnd = 200;

    const { body, statusCode } = requestUploadPhoto(token, imgUrl, xStart, yStart, xEnd, yEnd);

    expect(statusCode).toBe(200);
    expect(body).toEqual({});
  });

  test('should throw 400 error if image cannot be retrieved', () => {
    requestClear();
    const tokenA = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash').token;
    const token = tokenA;
    const imgUrl = 'http://abcats.com/non-existing-image.jpg';
    const xStart = 0;
    const yStart = 0;
    const xEnd = 100;
    const yEnd = 100;

    const { statusCode } = requestUploadPhoto(token, imgUrl, xStart, yStart, xEnd, yEnd);

    expect(statusCode).toBe(400);
  });

  test('should throw 400 error if image file format is not JPEG', () => {
    requestClear();
    const tokenA = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash').token;
    const token = tokenA;
    const imgUrl = 'http://example.com/image.png';
    const xStart = 0;
    const yStart = 0;
    const xEnd = 100;
    const yEnd = 100;

    const { statusCode } = requestUploadPhoto(token, imgUrl, xStart, yStart, xEnd, yEnd);

    expect(statusCode).toBe(400);
  });

  test('should throw 400 error if crop bounds are invalid', () => {
    requestClear();
    const tokenA = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash').token;
    const token = tokenA;
    const imgUrl = jpgImage;
    const xStart = -1;
    const yStart = 0;
    const xEnd = 100;
    const yEnd = 100;

    const { statusCode } = requestUploadPhoto(token, imgUrl, xStart, yStart, xEnd, yEnd);

    expect(statusCode).toBe(400);
  });

  test('should throw 400 error if crop bounds are invalid', () => {
    requestClear();
    const tokenA = requestAuthRegister('duck@gmail.com', 'duck123', 'duck', 'dash').token;
    const token = tokenA;
    const imgUrl = jpgImage;
    const xStart = 0;
    const yStart = -1;
    const xEnd = 100;
    const yEnd = 50;

    const { statusCode } = requestUploadPhoto(token, imgUrl, xStart, yStart, xEnd, yEnd);

    expect(statusCode).toBe(400);
  });
});