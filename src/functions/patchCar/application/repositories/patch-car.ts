import { createConnection } from '../../../../common/application/create-connection';
import { CarModel } from '../../../getCar/application/validators/validate-car';
import { buildQuery } from './query-builder';

export async function patchCarById(id: number, oldModel: CarModel, newModel: CarModel) {
  using db = createConnection();
  const merged = { ...oldModel, ...newModel };
  await db.connection.promise().query(buildQuery(id, merged));
}
