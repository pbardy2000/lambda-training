import { findCar } from '../repositories/find-car';

export async function getCar(id: number) {
  const cars = await findCar(id);
  return cars.map((car) => ({
    ...car,
    // color: car.color.toUpperCase(),
  }));
}
