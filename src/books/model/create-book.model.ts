/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum BooksCategory {
    TECH = 'tech',
    MOTIVATIONAL = 'motivational',
    SCIENCE = 'science',
    FINANCE = 'finance',
    STORY = 'story',

}

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
    Url?: string

    @Prop()
    isbn: number;

    @Prop()
    coverImage: string;

    @Prop({ enum: BooksCategory, default:BooksCategory})

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now() })
    updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);



