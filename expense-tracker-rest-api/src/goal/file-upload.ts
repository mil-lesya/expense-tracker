import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|jfif|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};
export const editFileName = (req, file, callback) => {
  const filename = file.originalname.split('.').shift()
  const extension = file.originalname.split('.').pop();
  callback(null, `${filename}-${Date.now()}.${extension}`);
};

export const getDestination = (req, file, callback) => {
  const destinationPath = `./uploads/${req.user.id}/goals`;
  fs.mkdirSync(destinationPath, { recursive: true });
  callback(null, destinationPath);
};