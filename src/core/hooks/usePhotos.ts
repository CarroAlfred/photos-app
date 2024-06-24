import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchData, fetchDataInfinite } from "../api/request";
import { Photo } from "../models/Photo";

const PHOTOS_STALE_TIME = 1000 * 30; // 30s
const PHOTOS_STALE_TIME_CACHE_TIME = 1000 * 60 * 10; // 10 Mins

export const usePhotos = () => {
  const response = useQuery({
    queryKey: ["photos"],
    // async () => await checkSuccess(TeamsService.teamGetById(Number(teamId))),
    queryFn: async () => await fetchData(),
    staleTime: PHOTOS_STALE_TIME,
    gcTime: PHOTOS_STALE_TIME_CACHE_TIME,
  });
  return response;
};

export const usePhotosInfiniteQuery = (params: { title: string }) => {
  const response = useInfiniteQuery({
    queryKey: ["photos", params],
    queryFn: fetchDataInfinite,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  // Filter the fetched data based on the keyword
  const filteredPages =
    response.data?.pages.map((page) => ({
      ...page,
      data: page.data.filter((photo: Photo) =>
        photo.title.includes(params.title)
      ),
    })) || [];

  return {
    ...response,
    data: {
      pages: filteredPages,
      pageParams: response.data?.pageParams || [],
    },
  };
};
