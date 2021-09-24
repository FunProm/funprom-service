import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions/questions.service';
import { QuestionsController } from './questions/questions.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, QuestionsController],
  providers: [AppService, QuestionsService],
})
export class AppModule {}
