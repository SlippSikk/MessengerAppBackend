import HTTPError from 'http-errors';
import request from 'sync-request';
import fs from 'fs';
import Jimp from 'jimp';
import { validateToken } from './helper';
export async function uploadPhoto(token: string, imgUrl: string, xStart: number, yStart: number, xEnd: number, yEnd: number) {
  // Make sure the URL is not using https
  if (!validateToken(token)) {
    throw HTTPError(403, 'Invalid Token');
  }

  // Download the image from the URL
  const response = request('GET', imgUrl);
  if (response.statusCode !== 200) {
    throw  HTTPError(400, 'Error retrieving image from URL');
  }

  const body = response.getBody();
  const filename = 'src/static/avatar.jpg';
  fs.writeFileSync(filename, body, { flag: 'w' });

  // Load the image with Jimp
  const image = Jimp.read(filename);
  if (!image) {
    throw  HTTPError(400, 'Error loading image file');
  }

  // Get the dimensions of the image
  
  const { width, height } = await image;

  // Check that the crop bounds are within the image dimensions
  if (xStart < 0 || xStart >= width || yStart < 0 || yStart >= height ||
      xEnd < 0 || xEnd >= width || yEnd < 0 || yEnd >= height) {
    throw  HTTPError(400, 'Invalid crop bounds');
  }

  // Check that xEnd is greater than xStart and yEnd is greater than yStart
  if (xEnd <= xStart || yEnd <= yStart) {
    throw  HTTPError(400, 'Invalid crop bounds');
  }

  // Check that the file is a JPEG
  const fileFormat = await Jimp.MIME_JPEG;
  if ((await image).getMIME() !== fileFormat) {
    throw  HTTPError(400, 'Invalid file format');
  }

  // Crop the image and overwrite the original file
  (await image).crop(xStart, yStart, xEnd - xStart, yEnd - yStart).writeAsync(filename);

  return {};
}