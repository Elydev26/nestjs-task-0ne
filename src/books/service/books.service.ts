import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../model/create-book.model';
import { CreateBookDto } from '../dto/create-book.dto';
import { AwsService } from '../../util/Aws/aws.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    private readonly awsService: AwsService,
  ) {}

  async create(
    createBookDto: CreateBookDto,
    file: Express.Multer.File,
  ): Promise<Book> {
    const fileUrl = await this.awsService.uploadFile(file);
    const createdBook = new this.bookModel({ ...createBookDto, fileUrl });
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async getFile(id: string): Promise<{ filename: string; fileUrl: string }> {
    const book = await this.findById(id);
    const fileUrl = await this.awsService.getFileUrl(book.fileKey);
    return { filename: book.fileKey, fileUrl };
  }

  async updateById(id: string, updateBookDto: CreateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
    return updatedBook;
  }

  async deleteById(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    return deletedBook;
  }

  async findByEmail(email: string): Promise<Book> {
    return this.bookModel.findOne({ email }).exec();
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Book } from './book.model';
// @Injectable()
// export class BooksService {
//     constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

//     async create(book: Book): Promise<Book> {
//         const createdBook = new this.bookModel(book);
//         return createdBook.save();
//     }

//     async findAll(): Promise<Book[]> {
//         return this.bookModel.find().exec();
//     }

//     async findById(id: string): Promise<Book> {
//         return this.bookModel.findById(id).exec();
//     }

//     async update(id: string, book: Book): Promise<Book> {
//         return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
//     }

//     async delete(id: string): Promise<Book> {
//         return this.bookModel.findByIdAndRemove(id).exec();
//     }
// }
