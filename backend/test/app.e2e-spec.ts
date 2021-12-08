import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  process.env.JWT_SECRET = 'test';
  let createdExerciseGroupId: string;
  let createdMealGroupId: string;
  let createdNoteId: string;
  let createdMealId: string;
  let createdExerciseId: string;
  let initialChatRef: string;
  let initialChatLength: number;
  let initialMessageRef: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/login/token (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/login/token')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );

    expect(response.status).toBe(201);
    expect(response.body.id).toBe('61a4f4a93d6cc562f1fb52a9');
  });

  it('/login/professional/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/login/professional/')
      .send({ email: ' string', password: ' string' });

    expect(response.status).toBe(201);
    expect(response.text.length).toBeGreaterThan(1);
  });

  it('/login/patient/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/login/patient/')
      .send({ email: ' string2', password: ' string' });

    expect(response.status).toBe(201);
    expect(response.text.length).toBeGreaterThan(1);
  });

  it('/professional/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/professional/')
      .field('name', 'test')
      .field('surname', 'test')
      .field('email', 'deletethis@test.com')
      .field('password', 'test')
      .field('businessName', 'test')
      .attach('profilePicture', 'test/sample.png');

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('test');
  });

  it('/professional/61a4f4a93d6cc562f1fb52a9 (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/professional/61a4f4a93d6cc562f1fb52a9')
      .send({
        name: 'test',
        surname: 'test',
        bussinessName: 'test',
        profilePicture:
          'https://metamed-images.s3.eu-west-3.amazonaws.com/7d843cfa-87ce-4213-80e1-76f47255a4f1',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body._id).toBe('61a4f4a93d6cc562f1fb52a9');
    expect(response.body.name).toBe('test');
  });

  it('/professional/61a4f4a93d6cc562f1fb52a9/patients (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/professional/61a4f4a93d6cc562f1fb52a9/patients/')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      )
      .send({ patientId: '61a661fd036917e975f253b0' });
    expect(response.status).toBe(201);
    expect(response.body.patients).toHaveLength(1);
  });

  it('/professional/61a4f4a93d6cc562f1fb52a9 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/professional/61a4f4a93d6cc562f1fb52a9')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    console.log(response.body.patients[0].chatRef);
    initialChatLength = response.body.patients[0].chatRef.messages.length;
    initialChatRef = response.body.patients[0].chatRef._id;
    console.log(initialChatLength);
    expect(response.body._id).toBe('61a4f4a93d6cc562f1fb52a9');
  });

  it('/exercise-group/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/exercise-group/')
      .send({
        name: 'test',
        patient: '61a661fd036917e975f253b0',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(201);
    createdExerciseGroupId = response.body.patients[0].exerciseGroups[0];
    console.log(createdExerciseGroupId);
    expect(response.body._id).toBe('61a4f4a93d6cc562f1fb52a9');
  });

  it('/exercise/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/exercise/')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      )
      .field('exerciseGroupId', createdExerciseGroupId)
      .field('name', 'test')
      .field('amount', 'deletethis@test.com')
      .attach('exerciseImage', 'test/sample.png');

    createdExerciseId = response.body._id;

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('test');
  });

  it('/exercise/createdExerciseId (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/exercise/' + createdExerciseId)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      )
      .field(
        'imageUrl',
        'https://metamed-images.s3.eu-west-3.amazonaws.com/7d843cfa-87ce-4213-80e1-76f47255a4f1',
      )
      .field('name', 'test2')
      .field('amount', 'deletethis@test.com')
      .attach('exerciseImage', 'test/sample.png');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('test2');
  });

  it('/exercise/createdExerciseId (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/exercise/' + createdExerciseId + '/' + createdExerciseGroupId)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Exercise removed successfully from groups',
    );
  });

  it('/exercise-group/createdId (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/exercise-group/' + createdExerciseGroupId)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(createdExerciseGroupId);
  });

  it('/exercise-group/createdId (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/exercise-group/' + createdExerciseGroupId)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      )
      .send({ name: 'test', extra: 'test' });
    expect(response.status).toBe(200);
    expect(response.body.extra).toBe('test');
  });

  it('/exercise-group/createdId (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(
        '/exercise-group/' +
          createdExerciseGroupId +
          '/61a661fd036917e975f253b0',
      )
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body.patients[0].exerciseGroups).toHaveLength(0);
  });

  it('/meal-group/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/meal-group/')
      .send({
        name: 'test',
        patient: '61a661fd036917e975f253b0',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(201);
    createdMealGroupId = response.body.patients[0].mealGroups[0];
    console.log(createdMealGroupId);
    expect(response.body._id).toBe('61a4f4a93d6cc562f1fb52a9');
  });

  it('/meal/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/meal/')
      .send({
        mealGroupId: createdMealGroupId,
        name: 'sample meal',
        amount: 'simple amount',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    createdMealId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('sample meal');
  });

  it('/meal/ (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/meal/' + createdMealId)
      .send({
        name: 'sample meal2',
        amount: 'simple amount',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('sample meal2');
  });

  it('/meal/createdMealId (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/meal/' + createdMealId + '/' + createdMealId)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Meal removed successfully from groups');
  });

  it('/meal-group/createdId (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/meal-group/' + createdMealGroupId)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(createdMealGroupId);
  });

  it('/meal-group/createdId (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/meal-group/' + createdMealGroupId)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      )
      .send({ name: 'test', extra: 'test' });
    expect(response.status).toBe(200);
    expect(response.body.extra).toBe('test');
  });

  it('/meal-group/createdId (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/meal-group/' + createdMealGroupId + '/61a661fd036917e975f253b0')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body.patients[0].mealGroups).toHaveLength(0);
  });

  it('/note/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/note/')
      .send({
        title: 'test',
        patient: '61a661fd036917e975f253b0',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(201);
    createdNoteId = response.body.patients[0].notes[0];
    console.log(createdNoteId);
    expect(response.body._id).toBe('61a4f4a93d6cc562f1fb52a9');
  });

  it('/note/createdId (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/note/' + createdNoteId)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      )
      .send({ title: 'test', description: 'test' });
    expect(response.status).toBe(200);
    expect(response.body.description).toBe('test');
  });

  it('/note/createdId (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/note/' + createdNoteId)
      .send({
        patientId: '61a661fd036917e975f253b0',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body.patients[0].notes).toHaveLength(0);
  });

  it('/chat/initialChatRef (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/chat/' + initialChatRef)
      .send({
        to: '61a661fd036917e975f253b0',
        text: 'Hello World',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    initialMessageRef = response.body.messages[0];
    console.log(response.body.messages);
    expect(response.status).toBe(200);
    expect(response.body.messages.length).toBe(initialChatLength + 1);
  });

  it('/message/initialMessageRef (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/message/' + initialMessageRef)
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body.read).toBe(true);
  });

  it('/professional/61a4f4a93d6cc562f1fb52a9/patients/61a661fd036917e975f253b0 (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(
        '/professional/61a4f4a93d6cc562f1fb52a9/patients/61a661fd036917e975f253b0',
      )
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      )
      .send({ allExtraDataUpdated: [{ key: 'weight', value: '120kg' }] });
    expect(response.status).toBe(200);
    expect(response.body.patients).toHaveLength(1);
    expect(response.body.patients[0].extraData[0].key).toBe('weight');
  });

  it('/professional/61a4f4a93d6cc562f1fb52a9/patients/61a661fd036917e975f253b0 (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(
        '/professional/61a4f4a93d6cc562f1fb52a9/patients/61a661fd036917e975f253b0',
      )
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      );
    expect(response.status).toBe(200);
    expect(response.body.patients).toHaveLength(0);
  });

  it('/patient/ (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/patient/')
      .field('name', 'test')
      .field('surname', 'test')
      .field('email', 'deletethis@test.com')
      .field('password', 'test')
      .field('gender', 'test')
      .field('birthDate', 'test')
      .attach('profilePicture', 'test/sample.png');

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('test');
  });

  it('/patient/61a661fd036917e975f253b0 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/patient/61a661fd036917e975f253b0')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiNjFhNjYxZmQwMzY5MTdlOTc1ZjI1M2IwIiwibmFtZSI6ImFhYWEiLCJlYW1pbCI6ImFhYSIsImlhdCI6MTUxNjIzOTAyMn0.c12vtWvR5jKPDtN8ce8gwuQEFOOzNBdDgBDyBKI0Cbw',
      );
    expect(response.status).toBe(200);
    expect(response.body._id).toBe('61a661fd036917e975f253b0');
  });

  it('/patient/61a661fd036917e975f253b0 (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/patient/61a661fd036917e975f253b0')
      .send({
        name: 'test',
        surname: 'test',
        gender: 'test',
        birthDate: 'test',
        profilePicture:
          'https://metamed-images.s3.eu-west-3.amazonaws.com/7d843cfa-87ce-4213-80e1-76f47255a4f1',
      })
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiNjFhNjYxZmQwMzY5MTdlOTc1ZjI1M2IwIiwibmFtZSI6ImFhYWEiLCJlYW1pbCI6ImFhYSIsImlhdCI6MTUxNjIzOTAyMn0.c12vtWvR5jKPDtN8ce8gwuQEFOOzNBdDgBDyBKI0Cbw',
      );
    expect(response.status).toBe(200);
    expect(response.body._id).toBe('61a661fd036917e975f253b0');
    expect(response.body.name).toBe('test');
  });
});
