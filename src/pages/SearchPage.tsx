import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

//apis
import { getPosts } from "@/apis";

//components
import { SearchHeader, Post, PostSkeleton, Dialog } from "@/components";

//styles
import { colors } from "@/styles/colors";

interface IPost {
  id: string;
  title: string;
  imageUrl: string;
  netloc: string;
  url: string;
  faviconUrl: string;
  isSaved: boolean;
}

export const SearchPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") as string;

  const [bottomElementRef, inView] = useInView();

  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["posts", query],
    async ({ pageParam = 0 }) => {
      const { data } = await getPosts(query, pageParam);
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        console.log(lastPage.queries.nextPage[0].startIndex, "???");
        return lastPage.queries.nextPage[0].startIndex;
      },
    },
    {
      onError: () => {
        setOpenErrorDialog(true);
      },
      refetchOnWindowFocus: false,
    }
  );

  const goToSearchPage = (query: string) => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        query,
      }).toString(),
    });
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getHelpText = () => {
    if (data?.pages[0].documents.length === 0 && !isFetching) {
      return "검색 결과가 없어요.";
    }
    if (!hasNextPage) {
      return "모든 검색 결과를 불러왔어요.";
    }
  };

  const renderData = () => {
    if (typeof data === "undefined") {
      return null;
    }
    return data.pages?.map((page: any) => {
      return page.items?.map((post: IPost) => {
        return (
          <Post
            key={post.link}
            id={post.link}
            title={post.title}
            imageUrl={post.pagemap?.cse_image?.[0]?.src}
            netloc={post.link}
            url={post.link}
            faviconUrl={post.pagemap?.cse_thumbnail?.[0]?.src}
            initialIsSaved={false}
          />
        );
      });
    });
  };

  useEffect(() => {
    console.log(query, inView, hasNextPage, !isFetching);
    if (query && inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <S.Container>
      <SearchHeader initialValue={query} onClickInputEnter={goToSearchPage} />
      <S.PostsWrapper>
        {renderData()}
        {isFetching && <PostSkeleton repeat={10} />}
        <div ref={bottomElementRef} />
        {/* <S.HelpText>{getHelpText()}</S.HelpText> */}
      </S.PostsWrapper>
      <Dialog open={openErrorDialog} setOpen={setOpenErrorDialog} />
    </S.Container>
  );
};

const S: any = {};

S.Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  min-height: 100vh;
`;

S.PostsWrapper = styled.section`
  padding-top: 88px;
  width: 100%;
  height: 100%;
`;

S.HelpText = styled.span`
  margin-top: 40px;
  font-size: 14px;
  color: ${colors.g4};
  text-align: center;
  display: flex;
  justify-content: center;
`;
