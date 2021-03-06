import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessionalModule } from './resources/professional/professional.module';
import { S3ImageService } from './services/s3-image-service/s3-image-service.service';
import { PatientModule } from './resources/patient/patient.module';
import { ChatModule } from './resources/chat/chat.module';
import { MessageModule } from './resources/message/message.module';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './resources/login/login.module';
import { ExerciseGroupModule } from './resources/exercise-group/exercise-group.module';
import { ExerciseModule } from './resources/exercise/exercise.module';
import { MealGroupModule } from './resources/meal-group/meal-group.module';
import { MealModule } from './resources/meal/meal.module';
import { NoteModule } from './resources/note/note.module';
import { WebSocketGatewayChat } from './services/web-socket.gateway';
import LogsMiddleware from './middleware/logger.middleware';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProfessionalModule,
    PatientModule,
    ChatModule,
    MessageModule,
    LoginModule,
    ExerciseGroupModule,
    ExerciseModule,
    MealGroupModule,
    MealModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService, S3ImageService, WebSocketGatewayChat],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
