import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { QuestionDefinition } from '../Models/QuestionDefinition';
import { Question } from '../Models/Question';
import * as QuestionDataJson from '../../resources/ichom_prom_breast_cancer_no_types.json';

@Injectable()
export class QuestionsService implements OnApplicationBootstrap {
  private questionDefinition: QuestionDefinition;

  onApplicationBootstrap() {
    console.log(`The module has been initialized.`);
  }

  setQuestionSet(questionDefinition: QuestionDefinition) {
    this.questionDefinition = questionDefinition;
  }

  getQuestionSet(limit = 10): Array<Question> {
    const randomCategory = Math.ceil(Math.random() * 5);
    console.log(this.questionDefinition);
    return QuestionDataJson.questions
      .filter((question) => parseInt(question.category, 10) === randomCategory)
      .slice(0, limit);
  }
}
