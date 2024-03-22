import { createConnection } from '../../../../common/application/create-connection';
import { buildQuery } from './query-builder';

export async function deleteCarById(id: number) {
  using db = createConnection();
  await db.connection.promise().query(buildQuery({ id }));
}
