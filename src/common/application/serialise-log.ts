export const serialiseLogMessage = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }

  if (data instanceof Error) {
    return JSON.stringify(data, Object.getOwnPropertyNames(data));
  }

  return JSON.stringify(data);
};
