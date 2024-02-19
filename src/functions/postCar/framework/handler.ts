import { createResponse } from '@dvsa/mes-microservice-common/application/api/create-response';
import { HttpStatus } from '@dvsa/mes-microservice-common/application/api/http-status';
import {
  bootstrapLogging, error,
} from '@dvsa/mes-microservice-common/application/utils/logger';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { serialiseLogMessage } from '../../../common/application/serialise-log';
import { validateCar } from '../../getCar/application/validators/validate-car';
import { createCar } from '../application/service/create-car';

// Remove when logic implemented
// eslint-disable-next-line @typescript-eslint/require-await
export async function handler(event: APIGatewayProxyEvent) {
  try {
    bootstrapLogging('post-car', event);

    if (!event.body) {
      error('Event body is empty');
      return createResponse({ msg: 'Event body is empty' }, HttpStatus.BAD_REQUEST);
    }

    const body = JSON.parse(event.body) as unknown;
    if (!validateCar(body)) {
      error('Event body is malformed');
      return createResponse({ msg: 'Event body is malformed' }, HttpStatus.BAD_REQUEST);
    }

    await createCar(body);

    return createResponse({ ...JSON.parse(event.body) });
  } catch (err) {
    error(serialiseLogMessage(err));

    return createResponse('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
