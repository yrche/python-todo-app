export async function apiRequest<T>(fn: () => Promise<Response>): Promise<T> {
  const response = await fn();

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = (await response.json()) as T;

  return result;
}

export function baseRequest(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const request = fetch(url, options);
  return request;
}
