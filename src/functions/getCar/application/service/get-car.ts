import { findCar } from '../repositories/find-car';

export async function getCar(id: number) {
  return findCar(id);
}
