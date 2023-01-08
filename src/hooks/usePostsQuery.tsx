import { useState } from "react";
import { useInfiniteQuery } from "react-query";

//apis
import { getPosts } from "@/apis";

interface IPost {
  queries: {
    nextPage: {
      startIndex: number;
    }[];
  };
}

export const usePostsQuery = (query: string) => {
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    IPost,
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
      onError(error) {
        setIsErrorDialogOpen(true);
      },
    }
  );

  return {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isErrorDialogOpen,
    setIsErrorDialogOpen,
  };
};
