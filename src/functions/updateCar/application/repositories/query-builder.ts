import { format } from 'mysql2';
import { CarModel } from '../../../getCar/application/validators/validate-car';

const query = `
  UPDATE CARS
  SET REG_NUMBER = ?, YEAR_OF_MANUFACTURE = ?, COLOUR = ?, IS_TAXED = ?
  WHERE id = ?
`;

export function buildQuery(id: number, model: CarModel) {
  return format(query, [model.regNumber, model.yearOfManufacturer, model.color, model.isTaxed, id]);
}
