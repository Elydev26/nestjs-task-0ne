/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BooksCategoryEnum } from '../enum/book.enum';

@Schema()
export class Book extends Document {
    
    @Prop()
    title: string;

    @Prop()
    author: string;

    @Prop()
    description: string;

    @Prop()
    publishedYear: number;

    @Prop()
    fileUrl: string;

    @Prop()
    isbn: number;

    @Prop()
    coverImage: string;

    @Prop()
    fileKey: string;

    @Prop()
    file: string;
    
    @Prop({ type: String, enum: Object.values(BooksCategoryEnum), default: BooksCategoryEnum.TECH})
    designation: BooksCategoryEnum

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now() })
    updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);



