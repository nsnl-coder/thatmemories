const fetchData = async <T>(
  url: string,
  options?: RequestInit | undefined,
): Promise<T> => {
  const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(`${base_url}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const parsedRes = await res.json();

  return parsedRes;
};

export default fetchData;
