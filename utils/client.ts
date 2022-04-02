type Config = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: string;
  headers?: Record<string, string>;
  [key: string]: unknown;
};

export async function client(
  endpoint: string,
  { body, method, ...customConfig }: Config
) {
  const headers = { 'Content-Type': 'application/json' };

  let config: Config = {
    method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (error) {
    console.error('__ERROR__', error);
  }
}

client.get = (endpoint: string, customConfig?: Omit<Config, 'method'>) => {
  return client(endpoint, { ...customConfig, method: 'GET' });
};

client.post = (
  endpoint: string,
  body: string,
  customConfig?: Omit<Config, 'method'>
) => {
  return client(endpoint, { body, ...customConfig, method: 'POST' });
};

client.patch = (
  endpoint: string,
  body: string,
  customConfig?: Omit<Config, 'method'>
) => {
  return client(endpoint, { body, ...customConfig, method: 'PATCH' });
};

client.delete = (endpoint: string, customConfig?: Omit<Config, 'method'>) => {
  return client(endpoint, { ...customConfig, method: 'DELETE' });
};
