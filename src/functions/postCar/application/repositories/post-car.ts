import { createConnection } from '../../../../common/application/create-connection';
import { CarModel } from '../../../getCar/application/validators/validate-car';
import { buildQuery } from './query-builder';

export async function postCar(car: CarModel) {
  using db = createConnection();
  await db.connection.promise().query(buildQuery(car));
}
