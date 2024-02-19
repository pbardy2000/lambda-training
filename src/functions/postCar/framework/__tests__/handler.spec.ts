import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../handler';

describe('postCar', () => {
  describe('400', () => {
    it('should return appropriate status code with message', async () => {
      // ARRANGE
      const body = null;
      const event = { body } as APIGatewayProxyEvent;
      // ACT
      const resp = await handler(event);
      // ASSERT
      expect(resp.statusCode).toEqual(400);
    });
  });
});
