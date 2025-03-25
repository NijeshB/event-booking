//export const isProduction = process.env.NODE_ENV === 'production';
export const isProduction =
  (process.env.NODE_ENV || '').trim().toLowerCase() === 'production';
