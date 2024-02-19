import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../handler';

describe('postCar', () => {
  describe('200', () => {
    it('should return appropriate status code with payload', async () => {
      // ARRANGE
      const body = { key: 'value' };
      const event = { body: JSON.stringify(body) } as APIGatewayProxyEvent;
      // ACT
      const resp = await handler(event);
      // ASSERT
      expect(resp.statusCode).toEqual(200);
    });
  });

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
