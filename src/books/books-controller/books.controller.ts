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
} from '@nestjs/common';
import { BooksService } from '../books-service/books.service';
import { Book } from '../model/create-book.model';
import { bookSchema } from '../model/create-bookschema.model';
import { CreateBookDto } from '../dto/create-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { ObjectValidationPipe } from 'src/util/object-vilidator/object-validator.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ObjectValidationPipe(bookSchema))
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
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
