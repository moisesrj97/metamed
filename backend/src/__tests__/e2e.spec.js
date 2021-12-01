describe('Given the NestJs aplication', () => {
  describe('When GET /', () => {
    test('It returns Hello World ', () => {
      const response = request(app).get('/');
    });
  });
});
