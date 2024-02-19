import { createConnection } from '../../../../common/application/create-connection';
import { buildQuery } from './query-builder';

export async function findCar(id: number) {
  using db = createConnection();
  return db.connection.promise().query(buildQuery(id));
}
