export const fetchReqRes = async (url: string, options: RequestInit) => {
  return await fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      'Content-Type': 'application/json',
      'x-api-key': process.env.REQRES_SECRET || ''
    }
  });
};
