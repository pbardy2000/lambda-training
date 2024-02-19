import { format } from 'mysql2';

const query = `
  SELECT * FROM CARS
  WHERE id = ?
  LIMIT 1;
`;

export function buildQuery(id: number) {
  return format(query, [id]);
}
