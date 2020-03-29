import nodeFetch from 'node-fetch';

const headersConfig = {
  'Content-Type': 'application/json',
};
export default async function fetchAsync(
  url,
  method = 'GET',
  body = null,
  headers = headersConfig,
) {
  const fetchingData = await nodeFetch(url, {
    method,
    body: JSON.stringify(body),
    headers,
  });
  const data = await fetchingData.json();
  return data;
}
