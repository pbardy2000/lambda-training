import { createResponse } from '@dvsa/mes-microservice-common/application/api/create-response';
import { HttpStatus } from '@dvsa/mes-microservice-common/application/api/http-status';
import { bootstrapLogging, error } from '@dvsa/mes-microservice-common/application/utils/logger';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { getCar } from '../application/service/get-car';

export async function handler(event: APIGatewayProxyEvent) {
  try {
    bootstrapLogging('get-car', event);

    if (!event.pathParameters) {
      error('No path params');
      return createResponse({ msg: 'No path params' }, HttpStatus.NOT_FOUND);
    }

    const id = parseInt(String(event.pathParameters.value), 10);
    const cars = await getCar(id);

    if (cars.length === 0) {
      return createResponse({ msg: 'No results found' }, HttpStatus.NOT_FOUND);
    }

    if (cars.length > 1) {
      return createResponse({ msg: 'Too many results found' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return createResponse(cars[0], HttpStatus.OK);
  } catch (err: unknown) {
    error((err instanceof Error) ? err.message : `Unknown error: ${err as string}`);

    return createResponse('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
