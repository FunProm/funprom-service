import { Injectable } from '@nestjs/common';
import { QuestionDefinition } from '../Models/QuestionDefinition';
import { Question } from '../Models/Question';

@Injectable()
export class QuestionsService {
  private questionDefinition: QuestionDefinition;

  setQuestionSet(questionDefinition: QuestionDefinition) {
    this.questionDefinition = questionDefinition;
  }

  getQuestionSet(): Array<Question> {
    const randomCategory = Math.ceil(Math.random() * 5);
    console.log(this.questionDefinition);
    return this.questionDefinition.questions.filter(
      (question) => parseInt(question.category, 10) === randomCategory,
    );
  }
}
