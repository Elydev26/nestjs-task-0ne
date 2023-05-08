/* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Injectable()
// export class UploadService {
//   constructor() {}

//   async uploadFile(file: Express.Multer.File): Promise<string> {
//     const fileName = `${Date.now()}${extname(file.originalname)}`;

//     const storage = diskStorage({
//       destination: './uploads',
//       filename: (req, file, cb) => {
//         cb(null, fileName);
//       },
//     });

//     const upload = multer({
//       storage,
//       limits: {
//         fileSize: 1024 * 1024 * 5, // 5MB max file size
//       },
//       fileFilter: (req, file, cb) => {
//         if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//           return cb(new Error('Only image files are allowed!'));
//         }

//         cb(null, true);
//       },
//     }).single('file');

//     return new Promise((resolve, reject) => {
//       upload(file, {}, (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(fileName);
//         }
//       });
//     });
//   }
// }
