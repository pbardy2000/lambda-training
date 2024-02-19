import { CarModel } from '../../../getCar/application/validators/validate-car';
import { postCar } from '../repositories/post-car';

export async function createCar(data: CarModel) {
  await postCar(data);
}
