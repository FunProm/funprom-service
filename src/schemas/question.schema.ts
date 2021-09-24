import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  number: string;

  @Prop()
  category: number;

  @Prop()
  question: string;

  @Prop()
  type: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
