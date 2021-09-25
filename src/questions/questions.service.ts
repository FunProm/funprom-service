import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { QuestionDefinition } from '../Models/QuestionDefinition';
import { Question } from '../Models/Question';
import * as QuestionDataJson from '../../resources/ichom_prom_breast_cancer_no_types.json';
import loki from 'lokijs';
import { Answer } from '../Models/Answer';

@Injectable()
export class QuestionsService implements OnApplicationBootstrap {
  private questionDefinition: QuestionDefinition;
  private db;
  private answersCollection;

  onApplicationBootstrap() {
    this.db = new loki('Answers');
    this.answersCollection = this.db.addCollection('answersCollection');
  }

  setQuestionSet(questionDefinition: QuestionDefinition) {
    this.questionDefinition = questionDefinition;
  }

  getQuestionSet(limit = 10, category = undefined): Array<Question> {
    const existingAnswerCollections = this.answersCollection.find();

    const alreadyAnsweredQuestionsNumbers = existingAnswerCollections
      .map((answerCollection) =>
        answerCollection.answers.map((answer) => answer.number),
      )
      .flat(1);
    const desiredCategory =
      category !== undefined ? parseInt(category) : this.getRandomCategory();
    return QuestionDataJson.questions
      .filter((question) => parseInt(question.category, 10) === desiredCategory)
      .filter(
        (question) =>
          !alreadyAnsweredQuestionsNumbers.includes(question.number),
      )
      .slice(0, limit);
  }

  getRandomCategory(): number {
    return Math.ceil(Math.random() * 5);
  }

  updateAnswer(userId: number, answer: Answer) {
    const existingRecord = this.answersCollection.findOne({ userId });
    if (existingRecord) {
      const existingAnswer = existingRecord.answers.filter(
        (existing) => existing.number === answer.number,
      );
      if (existingAnswer.length > 0) {
        existingAnswer[0].answer = answer.answer;
      } else {
        existingRecord.answers = [answer, ...existingRecord.answers];
      }
      this.answersCollection.update(existingRecord);
    } else {
      this.answersCollection.insert({
        userId,
        answers: [answer],
      });
    }
  }
}
