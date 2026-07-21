function getEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error("Missing environment variable!");
  }

  return value;
}

export const ENV = {
  baseUrl: process.env.NEXT_PUBLIC_PYTHON_API,
} as const;
