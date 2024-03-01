import { format } from 'mysql2';

const query = `
  SELECT
    ID as id,
    REG_NUMBER as regNumber,
    YEAR_OF_MANUFACTURE as yearOfManufacture,
    LOWER(COLOUR) as color,
    IS_TAXED as isTaxed
  FROM CARS
  WHERE id = ?
  LIMIT 1;
`;

export function buildQuery(id: number) {
  return format(query, [id]);
}
