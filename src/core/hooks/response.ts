export function checkSuccess<T>(
  responsePromise: (page: {
    pageParam?: number;
  }) => Promise<{ success: boolean; data: T; error?: string }>
) {
  return async (page: { pageParam?: number }) => {
    const response = await responsePromise(page);
    if (!response.success) {
      throw new Error(String(response.error) ?? "Request Failed");
    }
    return response.data;
  };
}
