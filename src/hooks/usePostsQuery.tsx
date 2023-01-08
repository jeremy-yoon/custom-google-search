import { useState } from "react";
import { useInfiniteQuery } from "react-query";

//apis
import { getPosts } from "@/apis";

interface PostsData {
  queries: {
    nextPage: {
      startIndex: number;
    }[];
  };
}

export const usePostsQuery = (query: string) => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    PostsData,
    number
  >(
    ["posts", query],
    async ({ pageParam = 0 }) => {
      const { data } = await getPosts(query, pageParam);
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.queries.nextPage[0].startIndex;
      },
    }
  );

  return {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
