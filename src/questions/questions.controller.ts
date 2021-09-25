import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from '../Models/Question';
import { Answer } from '../Models/Answer';

@Controller('question')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getQuestionSet(@Query() queryParams): Array<Question> {
    return this.questionsService.getQuestionSet(
      queryParams.limit,
      queryParams.category,
    );
  }

  @Post(':userId')
  answer(@Param('userId', ParseIntPipe) userId, @Body() body: Answer) {
    this.questionsService.updateAnswer(userId, body);
  }
}
