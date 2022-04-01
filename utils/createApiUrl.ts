import md5 from 'md5';

export function createApiUrl(url: string): URL {
  const apiUrl = new URL(url);

  const now = Date.now().toString();
  apiUrl.searchParams.set('ts', now);

  if (
    !process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY ||
    !process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY
  ) {
    throw new Error('No Marvel API Key was found');
  }
  const hash = md5(
    `${now}${process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY}${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`
  );
  apiUrl.searchParams.set('hash', hash);
  apiUrl.searchParams.set(
    'apikey',
    process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY.toString()
  );

  return apiUrl;
}
