import { createConnection } from '../../../../common/application/create-connection';
import { CarModel } from '../validators/validate-car';
import { buildQuery } from './query-builder';

export async function findCar(id: number) {
  using db = createConnection();
  const [results] = await db.connection.promise().query(buildQuery(id));

  if (Array.isArray(results) && results.length > 0) {
    return results as CarModel[];
  }

  return [];
}
