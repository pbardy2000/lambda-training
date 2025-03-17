import { format } from "mysql2";
import type { CarModel } from "../../../getCar/application/validators/validate-car";

const query = `
  INSERT INTO CARS (REG_NUMBER, YEAR_OF_MANUFACTURE, COLOUR, IS_TAXED)
  VALUES (?, ?, ?, ?)
`;

export function buildQuery({
	regNumber,
	yearOfManufacture,
	color,
	isTaxed,
}: CarModel) {
	return format(query, [regNumber, yearOfManufacture, color, isTaxed]);
}
