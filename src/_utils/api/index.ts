export const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      'Content-Type': 'json',
    },
  }).then((res) => res.json());
