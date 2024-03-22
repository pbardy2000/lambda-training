import { deleteCarById } from '../repositories/delete-car';

export async function deleteCar(id: number) {
  await deleteCarById(id);
}
