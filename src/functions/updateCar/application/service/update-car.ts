import { getCar } from '../../../getCar/application/service/get-car';
import { CarModel } from '../../../getCar/application/validators/validate-car';
import { updateCarById } from '../repositories/update-car';

export async function updateCar(id: number, newModel: CarModel) {
  const [oldModel] = await getCar(id);
  await updateCarById(id, oldModel, newModel);
  const [updatedModel] = await getCar(id);

  return updatedModel;
}
