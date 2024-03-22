import { format } from 'mysql2';

const query = `
  DELETE FROM CARS
  WHERE id = ?
`;

export function buildQuery({ id }: { id: number }) {
  return format(query, [id]);
}
