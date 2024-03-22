import { createResponse } from '@dvsa/mes-microservice-common/application/api/create-response';
import { HttpStatus } from '@dvsa/mes-microservice-common/application/api/http-status';
import { bootstrapLogging, error } from '@dvsa/mes-microservice-common/application/utils/logger';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { serialiseLogMessage } from '../../../common/application/serialise-log';
import { getCar } from '../../getCar/application/service/get-car';
import { validateCar } from '../../getCar/application/validators/validate-car';
import { updateCar } from '../application/service/update-car';

export async function handler(event: APIGatewayProxyEvent) {
  try {
    bootstrapLogging('update-car', event);

    if (!event.pathParameters) {
      error('No path params');
      return createResponse({ msg: 'No path params' }, HttpStatus.NOT_FOUND);
    }

    if (!event.body) {
      error('Event body is empty');
      return createResponse({ msg: 'Event body is empty' }, HttpStatus.BAD_REQUEST);
    }

    const body = JSON.parse(event.body) as unknown;
    if (!validateCar(body)) {
      error('Event body is malformed');
      return createResponse({ msg: 'Event body is malformed' }, HttpStatus.BAD_REQUEST);
    }

    const id = parseInt(String(event.pathParameters.value), 10);
    const cars = await getCar(id);

    if (cars.length === 0) {
      return createResponse({ msg: 'No results found' }, HttpStatus.NOT_FOUND);
    }

    if (cars.length > 1) {
      return createResponse({ msg: 'Too many results found' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const updated = await updateCar(id, body);

    return createResponse(updated, HttpStatus.OK);
  } catch (err) {
    error(serialiseLogMessage(err));

    return createResponse('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
