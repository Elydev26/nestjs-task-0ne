import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './controller/books.controller';
import { BooksService } from './service/books.service';
import { Book, BookSchema } from './model/create-book.model';
import { AwsService } from 'src/util/Aws/aws.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, AwsService],
})
export class BooksModule {}
