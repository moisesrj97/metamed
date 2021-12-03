import { bootstrap } from './main';
import * as request from 'supertest';

describe('main', () => {
  it('should bootstrap', async () => {
    process.env.JWT_SECRET = 'test';
    const { app, server } = await bootstrap();
    const response = await request(server).get('/');
    await request(server).get('/21321312312313');
    await request(server).get('/professional/123');
    await request(server).get('/professional/123/123');
    await request(server)
      .post('/professional/61a4f4a93d6cc562f1fb52a9/patients/')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiI2MWE0ZjRhOTNkNmNjNTYyZjFmYjUyYTkiLCJuYW1lIjoiYWFhYSIsImVhbWlsIjoiYWFhIiwiaWF0IjoxNTE2MjM5MDIyfQ.ggjkRc90jNu_XfDNBuvHlfNt08ghAOgaggighcPubGc',
      )
      .send({ patientId: [] });
    app.close();
    expect(response.status).toBe(200);
  });
});
