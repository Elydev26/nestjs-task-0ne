import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { BooksService } from '../service/books.service';
import { Book } from '../model/create-book.model';
import { bookSchema } from '../validation/book.validator';
import { CreateBookDto } from '../dto/create-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { ObjectValidationPipe } from 'src/util/pipe/object.validator.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create_book')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ObjectValidationPipe(bookSchema))
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Book> {
    return this.booksService.create(createBookDto, file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/getfile')
  async download(@Param('id') id: string, @Res() res: Response) {
    const { filename, fileUrl } = await this.booksService.getFile(id);
    res.setHeader(
      'content Disposition',
      `attachement: filename: filename=${filename}`,
    );
    return res.redirect(fileUrl);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findById(@Param('id') id: string): Promise<Book> {
    return this.booksService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ObjectValidationPipe(bookSchema))
  @Put(':id')
  updateById(
    @Param('id') id: string,
    @Body() updateBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.updateById(id, updateBookDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteById(id);
  }
}
