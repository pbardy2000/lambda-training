import { createResponse } from '@dvsa/mes-microservice-common/application/api/create-response';
import { HttpStatus } from '@dvsa/mes-microservice-common/application/api/http-status';
import { bootstrapLogging, error } from '@dvsa/mes-microservice-common/application/utils/logger';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { serialiseLogMessage } from '../../../common/application/serialise-log';
import { getCar } from '../../getCar/application/service/get-car';
import { deleteCar } from '../application/service/delete-car';

export async function handler(event: APIGatewayProxyEvent) {
  try {
    bootstrapLogging('delete-car', event);

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

    await deleteCar(id);

    return createResponse(cars[0], HttpStatus.OK);
  } catch (err) {
    error(serialiseLogMessage(err));

    return createResponse('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
