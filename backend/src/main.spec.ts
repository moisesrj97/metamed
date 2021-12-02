import { bootstrap } from './main';
import * as request from 'supertest';

describe('main', () => {
  it('should bootstrap', async () => {
    const { app, server } = await bootstrap();
    const response = await request(server).get('/');
    const response404 = await request(server).get('/21321312312313');
    const response500 = await request(server).get('/professional/123');
    app.close();
    expect(response.status).toBe(200);
  });
});