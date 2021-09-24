import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDefinition } from '../Models/QuestionDefinition';
import { Question } from '../Models/Question';

@Controller('question')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getQuestionSet(@Query() queryParams): Array<Question> {
    return this.questionsService.getQuestionSet(queryParams.limit);
  }

  @Post()
  create(@Body() body: QuestionDefinition) {
    this.questionsService.setQuestionSet(body);
  }
}
