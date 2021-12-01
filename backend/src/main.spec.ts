import { bootstrap } from './main';
import * as request from 'supertest';

describe('main', () => {
  it('should bootstrap', async () => {
    const { app, server } = await bootstrap();
    const response = await request(server).get('/');
    app.close();
    expect(response.status).toBe(200);
  });
});
