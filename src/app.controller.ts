import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Question } from './Models/Question';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('question')
  getQuestionSet(): Array<Question> {
    const question = new Question();
    question.message = 'this is a test question';
    const questionSet = new Array<Question>();
    questionSet.push(question);
    return questionSet;
  }
}
