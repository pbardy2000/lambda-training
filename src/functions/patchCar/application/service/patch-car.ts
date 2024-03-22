import { getCar } from '../../../getCar/application/service/get-car';
import { CarModel } from '../../../getCar/application/validators/validate-car';
import { patchCarById } from '../repositories/patch-car';

export async function patchCar(id: number, newModel: CarModel) {
  const [oldModel] = await getCar(id);
  await patchCarById(id, oldModel, newModel);
  const [updatedModel] = await getCar(id);

  return updatedModel;
}
