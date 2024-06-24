import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/photos";

export const fetchData = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const fetchDataInfinite = async ({ pageParam = 0 }) => {
  const response = await axios.get(apiUrl);
  const data = response.data;
  // Assuming that the API does not provide a `nextCursor` in the response,
  // we compute it based on the current `pageParam` and the number of fetched items.
  const nextCursor = data?.length ? pageParam + 10 : undefined;

  return { data, nextCursor };
};
